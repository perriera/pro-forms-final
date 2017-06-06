import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { RecipeService } from '../recipes/recipe.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

@Injectable()
export class DataStorageService {

  recipesUrl = 'https://ng-recipe-book-2ab4d.firebaseio.com/recipes.json';

  constructor(private http: Http,
              private recipeService: RecipeService) {
  }

  storeRecipes() {
    return this.http.put(this.recipesUrl, this.recipeService.getRecipes());
  }

  fetchRecipes() {
    return this.http.get(this.recipesUrl)
      .map(
        (response: Response) => {
          const data = response.json();
          // console.log(data);
          // for (const server of data) {
          //   server.name = 'FETCHED_' + server.name;
          // }
          return data;
        }
      ).catch(
        (error: Response) => {
          console.log(error);
          return Observable.throw('Something went wrong');
        }
      );
  }

}
;
