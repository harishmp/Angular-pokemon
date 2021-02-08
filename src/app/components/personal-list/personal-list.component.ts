import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { SnackbarComponent } from 'src/app/shared/snackbar/snackbar.component';
import { PokemonDetailLocalStorage } from 'src/app/typed';

@Component({
  selector: 'app-personal-list',
  templateUrl: './personal-list.component.html',
  styleUrls: ['./personal-list.component.scss']
})
export class PersonalListComponent implements OnInit {

  personalData: Array<PokemonDetailLocalStorage> = [];
  enableView: boolean = false;

  constructor(private router: Router, public snackBar: MatSnackBar) { 
  }

  ngOnInit(): void {
    let personalData = JSON.parse(localStorage.getItem("personallist"));
    personalData.map(item => {
      this.personalData.push(new PokemonDetailLocalStorage( 
        item.name,
        item.id,
        item.sprites)
      );
  });
    if(this.personalData != null)
    if(this.personalData.length > 0) this.enableView = true;
  }

  redirecttoDetailPage(data: PokemonDetailLocalStorage){
    this.router.navigate([`dashboard/poke-detail/${data.id}`]);
  }

  addtoWishlist($event: PokemonDetailLocalStorage) {
    let wishlist = JSON.parse(localStorage.getItem('wishlist'));
    if(wishlist != null){
      let afterListfilter = wishlist.filter(item => item.id == $event.id);
      if(afterListfilter.length == 0){
        wishlist.push($event)
        localStorage.setItem('wishlist', JSON.stringify(wishlist)); 
        this.openSnackBar('Successfully added to wishlist', 'pizza-party');
      } else this.openSnackBar('Already added to wishlist', 'pizza-party');
    } else {
      wishlist = [];
      wishlist.push($event)
      localStorage.setItem('wishlist', JSON.stringify(wishlist)); 
      this.openSnackBar('Successfully added to Wishlist', 'pizza-party');
    }
  }

  deletefromPersonallist($event: PokemonDetailLocalStorage) {
    this.personalData = this.personalData.filter(item => item.id != $event.id);
    if(this.personalData.length == 0) this.enableView = false;
    localStorage.setItem('personallist', JSON.stringify(this.personalData));
    this.openSnackBar('Deleted from personal list', 'pizza-party');
  }

  openSnackBar(message: string, panelClass: string) {
    this.snackBar.openFromComponent(SnackbarComponent, {
      data: message,
      panelClass: panelClass,
      duration: 10000
    });
  }

}
