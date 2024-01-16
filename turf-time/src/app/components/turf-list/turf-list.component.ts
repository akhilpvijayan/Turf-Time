import { District } from './../shared/interface/district';
import { State } from './../shared/interface/state';
import { TurfDetails } from './../shared/interface/turfDetails';
import { Component } from '@angular/core';
import { TurfService } from './turf.service';
import { Validators, FormBuilder } from '@angular/forms';
import { PartnerAddService } from '../partner-add/partner-add.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-turf-list',
  templateUrl: './turf-list.component.html',
  styleUrls: ['./turf-list.component.scss']
})
export class TurfListComponent {
  turfs: TurfDetails[] = [];
  searchForm: any = [];
  statesList: State[] = [];
  districtList: District[] = [];
  isDistrictFieldEnabled = false;
  isSearch = false;
   constructor(
     private turfService:TurfService,
     private formBuilder: FormBuilder,
     private partnerAddService: PartnerAddService,
     private route: Router) {}
 
   ngOnInit(): void {
     this.initalizeForm();
     this.getStates();
   }

   initalizeForm() {
    this.searchForm = this.formBuilder.group({
      state: [, Validators.required],
      district: [, Validators.required],
    })
  }

  getStates(){
    this.statesList = [];
    this.partnerAddService.getStatesData().subscribe(res=> {
      const data = res.map((e: any) => {
        const d = e.payload.doc.data();
        this.statesList.push(d);
      })
    })
  }

  onStateChange(){
    this.districtList = [];
    const selectedState = parseInt(this.searchForm.value.state.toString(), 10);

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
    if(this.searchForm.valid){
      this.turfs = [];
    this.turfService.getAllTurfs().subscribe((res: any)=>{
      const data = res.map((e: any) => {
       const d = e.payload.doc.data();
       if(d.state === parseInt(this.searchForm.value.state.toString(), 10) && d.district === parseInt(this.searchForm.value.district.toString(), 10)){
        this.turfs.push(d);
        this.isSearch = true;
       }
     })
    })
    }
  }

  getTurfDetails(turfId: string){
    this.route.navigateByUrl(`turfdetails?q=${turfId}`);
  }
}
