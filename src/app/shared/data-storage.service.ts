import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {RecipeService} from '../recipes/recipe.service';
import 'rxjs-compat/add/operator/map';
import {Recipe} from '../recipes/recipe.model';
import {AuthService} from '../auth/auth.service';

@Injectable()
export class DataStorageService {

  constructor(private httpClient: HttpClient,
              private recipeService: RecipeService,
              private authService: AuthService) {

  }

  public storeRecipes() {
      const token = this.authService.getToken();
      return this.httpClient.put(`https://angular-demo-m.firebaseio.com/recipes.json?auth=${token}`, this.recipeService.getRecipes());
  }

  public getRecipes(){
    const token = this.authService.getToken();
    this.httpClient.get(`https://angular-demo-m.firebaseio.com/recipes.json?auth=${token}`)
      .map((response: Recipe[]) => {
        response.forEach(recipe => {
          if (!recipe['ingredients']) {
            recipe['ingredients'] = [];
          }
        });
        return response;
      })
      .subscribe(recipes =>
        this.recipeService.setRecipes(recipes));
  }

}
