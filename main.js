let app = Vue.createApp({
    data() {
        return {
            recipes: [],
            showRecipes: false,
            showShoppingList: false, // Lägg till en flagga för att visa/ gömma inköpslistan
            shoppingBag: [],
            
        };
    },

    methods: {
        getImagePath(imageFileName) {
            // Om bilderna ligger i en separat mapp, använd sökvägen:
            return `./foodImages/${imageFileName}`;
        },
        async getStarters() {
            await this.fetchRecipes('starter');
        },
        async getMainCourses() {
            await this.fetchRecipes('main course');
        },
        async getDesserts() {
            await this.fetchRecipes('dessert');
        },
        async fetchRecipes(category) {

            let response = await fetch('recipes.json'); 
            let data = await response.json();
            this.recipes = data.recipes.filter(recipe => recipe.mealType === category);
            
            this.showRecipes = true;
        },
       addToShoppingBag({ title, ingredients }) {
    const newItem = {
        title: title,
        ingredients: ingredients,
        checked: false,
    };
    this.shoppingBag.push(newItem);
    this.showShoppingList = true;
}
    }
});

app.mount('#app');
