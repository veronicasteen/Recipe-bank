let app = Vue.createApp({
    data() {
        return {
            recipes: [],
            showRecipes: false,
            showShoppingList: false, // Lägg till en flagga för att visa/ gömma inköpslistan
            shoppingBag: [],
            isAllergenInfoActive: false,
        };
    },

    methods: {

        //metod för att hämta bilderna från bild-mappen
        getImagePath(imageFileName) {

            return `./foodImages/${imageFileName}`;
        },

        //metoder för att fetcha från json-filen och hitta recept
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
            this.showShoppingList = false;

        },

        toggleView() {
            this.showRecipes = !this.showRecipes;
            this.showShoppingList = !this.showShoppingList;
        },

        //metod för att lägga till titel osv i shoppinglistan
        addToShoppingBag({ title, ingredients }) {
            const newItem = {
                title: title,
                ingredients: ingredients,
                checked: false,
            };
            this.shoppingBag.push(newItem);
        },
        //metod för att checka i eller ur checkboxen i shoppinglistan
        toggleCheckbox(item) {

            item.checked = !item.checked;
        },
        
        //metod för att ta bort icheckade items
        removeCheckedItems() {
            this.shoppingBag = this.shoppingBag.filter(item => !item.checked);

            if (this.shoppingBag.length === 0) {
            }
        },

        //metod för att checka i alla items i shoppinglistan
        checkAll() {
            let allChecked = this.shoppingBag.every(item => item.checked);
            this.shoppingBag.forEach(item => (item.checked = !allChecked));
        },

        //metod för att antingen visa eller avaktivera allergi-information
        toggleAllergenInfo() {
            this.isAllergenInfoActive = !this.isAllergenInfoActive;
          },
    }
});

app.mount('#app');
