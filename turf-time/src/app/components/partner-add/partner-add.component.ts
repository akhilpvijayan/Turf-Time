import { District } from './../shared/interface/district';
import { PartnerAddService } from './partner-add.service';
import { PartnerAddedDialogComponent } from './partner-added-dialog/partner-added-dialog.component';
import { Component, OnInit } from '@angular/core';
import { Form } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Partner } from '../shared/interface/partner';
import { State } from '../shared/interface/state';

@Component({
  selector: 'app-partner-add',
  templateUrl: './partner-add.component.html',
  styleUrls: ['./partner-add.component.scss']
})
export class PartnerAddComponent implements OnInit{
  partnerForm : Partner = new Partner;
  statesList: State[] = [];
  districtList: District[] = [];
  isDistrictFieldEnabled = false;

  constructor(private dialog: MatDialog, private partnerAddService: PartnerAddService) {}

  ngOnInit(): void {
    this.partnerAddService.getStatesData().subscribe(res=> {
      const data = res.map((e: any) => {
        const d = e.payload.doc.data();
        this.statesList.push(d);
      })
    })
  }

  onStateChange(){
    this.districtList = [];
    const selectedState = parseInt(this.partnerForm.state.toString(), 10);

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

  onSubmit(form: Form){
    this.dialog.open(PartnerAddedDialogComponent,{width:'840px', height:'220px', hasBackdrop:true, panelClass: 'custom-dialog-container' });
  }
}
