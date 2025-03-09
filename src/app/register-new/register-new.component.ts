import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { ImageModule } from 'primeng/image';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import {
  AutoCompleteCompleteEvent,
  AutoCompleteModule,
} from 'primeng/autocomplete';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { InputNumberModule } from 'primeng/inputnumber';
import { Auth, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-register-new',
  imports: [
    FormsModule,
    ButtonModule,
    ImageModule,
    FloatLabelModule,
    PasswordModule,
    InputTextModule,
    AutoCompleteModule,
    CommonModule,
    InputNumberModule,
  ],
  templateUrl: './register-new.component.html',
  styleUrl: './register-new.component.scss',
})
export class RegisterNewComponent implements OnInit {
  password = '';
  fullName = '';
  phoneNumber = null;
  countryCodeList!: {
    name: string;
    flag: string;
    dial_code: number;
  }[];
  filteredCountries!: {
    name: string;
    flag: string;
    dial_code: number;
  }[];

  selectedDialCode = 60;

  constructor(
    private http: HttpClient,
    private auth: Auth,
    private sharedService: SharedService
  ) {}

  ngOnInit() {
    this.fetchCountryCodes();
  }

  fetchCountryCodes() {
    this.http
      .get<any[]>(
        'https://gist.githubusercontent.com/devhammed/78cfbee0c36dfdaa4fce7e79c0d39208/raw/449258552611926be9ee7a8b4acc2ed9b2243a97/countries.json'
      )
      .subscribe((data) => {
        this.countryCodeList = data
          .map((country) => ({
            ...country,
            dial_code: country.dial_code.replace('+', ''),
          }))
          .sort((a, b) => {
            if (a.name === 'Malaysia') return -1;
            if (b.name === 'Malaysia') return 1;
            return 0;
          });
        this.filteredCountries = this.countryCodeList;
      });
  }

  filterCountry(event: AutoCompleteCompleteEvent) {
    let filtered: any[] = [];
    let query = event.query;

    for (let i = 0; i < this.countryCodeList.length; i++) {
      let country = this.countryCodeList[i];
      if (country.dial_code.toString().startsWith(query)) {
        filtered.push(country);
      }
    }

    this.filteredCountries = filtered;
  }

  async continueWithPassword() {
    this.sharedService.currentUser.fullName = this.fullName;
    this.sharedService.currentUser.phoneNumber = `${this.selectedDialCode}${this.phoneNumber}`;
    await this.sharedService.createAccount(this.password);
  }
}
