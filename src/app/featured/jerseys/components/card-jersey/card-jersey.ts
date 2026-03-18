import { Component, input } from '@angular/core';
import { JerseyCard } from '../../models/jersey-card';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-card-jersey',
  imports: [FaIconComponent],
  templateUrl: './card-jersey.html',
})
export class CardJersey {

  faStar = faStar;

  jersey = input<JerseyCard>({
    id: 0,             
    imageUrl: "",       
    name: "",
    typeDescription: "",   
    price: 0,           
    rating: 0,          
    isFavorite: false
  })
}
