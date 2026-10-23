import { computed, Directive, input } from "@angular/core";

@Directive({
  selector:'[appLowStock]',
  host: {
    '[style.backgroundColor]' : "color()"
  }
})

export class LowStock {
  // ALIAS PERMET DANS LES BALISES QUI VONT UTILISER NOTRE DIRECTIVE DE FAIRE
  // [appLowStock] = "amount"
  // SI ON A PAS ALIAS
  // [AppLowStock] stockAmont = "amount"
  stockAmount = input.required<number>({alias: "appLowStock"}) // AFFECTER LA VALEUR DUN STOCK DUN PRODUIT

  color = computed(() => this.stockAmount() <= 3  ? "red" : "")
}
