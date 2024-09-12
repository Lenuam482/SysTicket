import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CalculoService {
  private userData: { name: string; lastname: string; birthday: string } = { name: '', lastname: '', birthday: '' };

  constructor() {}

  setUserData(data: { name: string; lastname: string; birthday: string }) {
    this.userData = data;
  }

  getUserData() {
    return this.userData;
  }
}
