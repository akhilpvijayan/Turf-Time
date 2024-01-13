import { District } from './../shared/interface/district';
import { PartnerAddService } from './partner-add.service';
import { PartnerAddedDialogComponent } from './partner-added-dialog/partner-added-dialog.component';
import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { TurfDetails } from '../shared/interface/turfDetails';
import { State } from '../shared/interface/state';

@Component({
  selector: 'app-partner-add',
  templateUrl: './partner-add.component.html',
  styleUrls: ['./partner-add.component.scss']
})
export class PartnerAddComponent implements OnInit{
  partnerForm!: FormGroup;
  statesList: State[] = [];
  districtList: District[] = [];
  isDistrictFieldEnabled = false;

  constructor(private dialog: MatDialog, private partnerAddService: PartnerAddService, private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.initalizeForm();
    this.partnerAddService.getStatesData().subscribe(res=> {
      const data = res.map((e: any) => {
        const d = e.payload.doc.data();
        this.statesList.push(d);
      })
    })
  }

  initalizeForm() {
    this.partnerForm = this.formBuilder.group({
      turfName: ['', Validators.required],
      state: [, Validators.required],
      isRestRoom: [false],
      isRefreshments: [false],
      pricePerHour: [, Validators.required],
      isParking: [false],
      location: ['', Validators.required],
      imageUrl: ['', Validators.required],
      facilitatorName: ['', Validators.required],
      district: [, Validators.required],
      description: ['', Validators.required],
      phone: [, Validators.required],
      isActive: [true],
    })
  }

  onStateChange(){
    this.districtList = [];
    const selectedState = parseInt(this.partnerForm.value.state.toString(), 10);

    // If a state is selected, enable the district field and fetch districts data
    if (selectedState) {
      this.isDistrictFieldEnabled = true;

      // Fetch districts data for the selected state
      this.partnerAddService.getDistrictsData().subscribe(res => {
        const data = res.map((e: any) => {
          const d = e.payload.doc.data();
          if(d.stateId === selectedState){
            this.districtList.push(d);
          }
        })
      })
    } else {
      // If no state is selected, disable the district field and clear the districts data
      this.isDistrictFieldEnabled = false;
      this.districtList = [];
    }
  }

  onSubmit(){
    if(this.partnerForm.valid){
      this.partnerAddService.addTurfForReview(this.partnerForm.value).then(() => {
        this.dialog.open(PartnerAddedDialogComponent,{width:'840px', height:'220px', hasBackdrop:true, panelClass: 'custom-dialog-container' });
        this.partnerForm.reset();
      });
    }
  }
}
