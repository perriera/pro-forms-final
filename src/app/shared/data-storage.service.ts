import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { RecipeService } from '../recipes/recipe.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import { Recipe } from '../recipes/recipe.model';

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
    this.http.get(this.recipesUrl)
      .map(
        (response: Response) => {
          const recipes: Recipe[] = response.json();
          for ( const recipe of recipes ) {
            if ( !recipe['ingredients'] ) {
              console.log(recipe);
              recipe['ingredients'] = [];
            }
          }
          return recipes;
        }
      )
      .subscribe(
        (recipes: Recipe[]) => {
          this.recipeService.setRecipes(recipes);
        }
      );
  }

}
;
