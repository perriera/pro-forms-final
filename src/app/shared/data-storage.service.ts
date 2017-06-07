import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { RecipeService } from '../recipes/recipe.service';
import 'rxjs/Rx';
import { Recipe } from '../recipes/recipe.model';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class DataStorageService {

  recipesUrl = 'https://ng-recipe-book-2ab4d.firebaseio.com/recipes.json';

  constructor(private http: Http,
              private recipeService: RecipeService,
              private authService: AuthService) {
  }

  authUrl() {
    const token = this.authService.getToken();
    const url = this.recipesUrl + '?auth=' + token;
    return url;
  }

  storeRecipes() {
    return this.http.put(this.authUrl(), this.recipeService.getRecipes());
  }

  fetchRecipes() {
    this.http.get(this.authUrl())
      .map(
        (response: Response) => {
          const recipes: Recipe[] = response.json();
          for (const recipe of recipes) {
            if (!recipe[ 'ingredients' ]) {
              console.log(recipe);
              recipe[ 'ingredients' ] = [];
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
