import { Injectable } from '@angular/core';
import { Gym } from './models/gymEnum';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  public gym: Gym = Gym.Batuu;

  constructor() {}
}
