import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RoutesRecognized } from '@angular/router';
import { DataService } from 'src/services/data.service';
import { filter } from 'rxjs/operators';
import { pairwise } from 'rxjs/operators';

@Component({
  selector: 'app-pokedetail',
  templateUrl: './pokedetail.component.html',
  styleUrls: ['./pokedetail.component.scss']
})
export class PokedetailComponent implements OnInit {

  // mat-progress-bar
  color = 'primary';
  mode = 'determinate';
  value = 50;
  bufferValue = 75;

  pokemonDetails: any = '';
  pokemonImg = '';
  pokemonImgbig = '';
  pokemonType = [];
  gameindex;

  resultmove = [];
  resultstat = []
  enableView = false;
  isLoading = false;

  constructor(private activatedRouter: ActivatedRoute, private dataService: DataService, private router: Router) {
    // url params
    this.activatedRouter.params.subscribe(params => this.getPokemondetail(params['id']));
    // back to previous page router
    this.router.events.pipe(filter((e: any) => e instanceof RoutesRecognized), pairwise()).subscribe((e: any) => localStorage.setItem('previousUrl', e[0].urlAfterRedirects));
  }

  ngOnInit(): void {
  }

  getPokemondetail(id) {
      this.isLoading = true;
      this.dataService.getPokemons(id).subscribe((response: any) => {   
        this.pokemonDetails = response.json();
        this.enableView = true;
        this.isLoading = false;
        this.pokemonImg = this.pokemonDetails.sprites.front_default;
        this.pokemonImgbig = this.pokemonDetails.sprites.other.dream_world.front_default;
        this.pokemonType = this.pokemonDetails['types'][0].type.name;
        this.getMoves(this.pokemonDetails);
        this.getStats(this.pokemonDetails);
      },
      err => {
        this.isLoading = false;
        this.enableView = false;
        console.log('In Error Block---', err._body + ' ' + err.status);
      }
    )
  }

  getMoves(data) {
    data.moves.forEach(responsemove => {
      this.dataService.getPokeMovesStats(responsemove.move.url).subscribe((result: any) => this.resultmove.push(result.json()),
      err => {
        console.log('In Error Block---', err._body + ' ' + err.status);
      });
    });
  }

  getStats(data) {
    data.stats.forEach(responsestat => {
      this.dataService.getPokeMovesStats(responsestat.stat.url).subscribe((result: any) => this.resultstat.push(result.json()),
      err => {
        console.log('In Error Block---', err._body + ' ' + err.status);
      });
    });
  }

  back() {
    this.router.navigate([localStorage.getItem('previousUrl')]);
  }
}
