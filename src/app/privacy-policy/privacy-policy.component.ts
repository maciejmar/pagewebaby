import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-privacy-policy',
  templateUrl: './privacy-policy.component.html',
  styleUrls: ['./privacy-policy.component.scss']
})
export class PrivacyPolicyComponent implements OnInit {
  @Input() showModal: boolean = true;
  @Input() language_pl: boolean = true;

  closeModal() {
    this.showModal = false;
  }
  ngOnInit(): void {
      
  }

  

}
