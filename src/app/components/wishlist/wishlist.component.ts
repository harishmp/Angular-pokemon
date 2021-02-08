import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { SnackbarComponent } from 'src/app/shared/snackbar/snackbar.component';
import { PokemonDetailLocalStorage } from 'src/app/typed';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent implements OnInit {

  wishlistData: Array<PokemonDetailLocalStorage> = [];
  enableView: boolean = false;

  constructor(private router: Router, public snackBar: MatSnackBar) { 
  }

  ngOnInit(): void {
    let wishlistData = JSON.parse(localStorage.getItem("wishlist"));
    wishlistData.map(item => {
        this.wishlistData.push(new PokemonDetailLocalStorage( 
          item.name,
          item.id,
          item.sprites)
        );
    });
    if(this.wishlistData != null)
    if(this.wishlistData.length > 0) this.enableView = true;
  }

  redirecttoDetailPage(data: PokemonDetailLocalStorage){
    this.router.navigate([`dashboard/poke-detail/${data.id}`]);
  }

  deletefromWishlist($event: PokemonDetailLocalStorage) {
    this.wishlistData = this.wishlistData.filter(item => item.id != $event.id);
    if(this.wishlistData.length == 0) this.enableView = false;
    localStorage.setItem('wishlist', JSON.stringify(this.wishlistData));
    this.openSnackBar('Deleted from wishlist', 'pizza-party');
  }

  addtoPersonallist($event: PokemonDetailLocalStorage) {
    let personallist = JSON.parse(localStorage.getItem('personallist'));
    if(personallist != null){
      let afterListfilter = personallist.filter(item => item.id == $event.id);
      if(afterListfilter.length == 0){
        personallist.push($event)
        localStorage.setItem('personallist', JSON.stringify(personallist)); 
        this.openSnackBar('Successfully added to Personal list', 'pizza-party');
      } else this.openSnackBar('Already added to Personal list', 'pizza-party');
    } else {
      personallist = [];
      personallist.push($event)
      localStorage.setItem('personallist', JSON.stringify(personallist)); 
      this.openSnackBar('Successfully added to Personal list', 'pizza-party');
    }
  }

  openSnackBar(message: string, panelClass: string) {
    this.snackBar.openFromComponent(SnackbarComponent, {
      data: message,
      panelClass: panelClass,
      duration: 10000
    });
  }

}
