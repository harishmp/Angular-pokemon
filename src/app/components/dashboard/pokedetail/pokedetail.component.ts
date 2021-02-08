import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PokemonMoves, PokemonStats, PokemonDetailbyID } from 'src/app/typed';
import { DataService } from 'src/services/data.service';
import { NavigationService } from 'src/services/navigation.service';

@Component({
  selector: 'app-pokedetail',
  templateUrl: './pokedetail.component.html',
  styleUrls: ['./pokedetail.component.scss']
})
export class PokedetailComponent implements OnInit {

  // mat-progress-bar
  color: string = 'primary';
  mode: string = 'determinate';
  value: number;
  bufferValue: number = 75;

  pokemonDetails: PokemonDetailbyID;
  resultmove = new Array<PokemonMoves>();
  resultstat = new Array<PokemonStats>();
  enableView = false;
  isLoading = false;

  constructor(private dataService: DataService, private router: Router, public navigation: NavigationService, private activatedRouter: ActivatedRoute) {
    // url params
    this.activatedRouter.params.subscribe(params => this.getPokemondetail(params['id']));
  }

  ngOnInit(): void {
  }

  getPokemondetail(id: number) {
      this.isLoading = true;
      this.dataService.getPokemons(id).subscribe((response: any) => { 
        this.pokemonDetails = new PokemonDetailbyID( 
          response.name,
          response.id,
          response.sprites,
          response.dream_world,
          response.types,
          response.moves,
          response.stats,
          response.height,
          response.weight,
          response.order,
          response.base_experience
        )
        this.enableView = true;
        this.isLoading = false;
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
      this.dataService.getPokeMoves(responsemove.move.url).subscribe((movesResponse: any) => {
        this.resultmove.push(new PokemonMoves( 
          movesResponse.name,
          movesResponse.type,
          movesResponse.accuracy)
        );
      },
      err => console.log('In Error Block---', err._body + ' ' + err.status));
    });
  }

  getStats(data) {
    data.stats.forEach(responsestat => {
      this.dataService.getPokeStats(responsestat.stat.url).subscribe((statsResponse: any) => {
        this.resultstat.push(new PokemonStats( 
          statsResponse.name,
          statsResponse.id,
          statsResponse.game_index)
        );
      },
      err => console.log('In Error Block---', err._body + ' ' + err.status));
    });
  }
}
