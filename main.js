Vue.createApp({
    data() {

        return {
            showRecipes: false,
            showShoppingList: false,
            shoppingBag: [],
            recipes: [],
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
        this.showRecipes = false;
        this.showShoppingList = true;

},

        addToShoppingBag({ ingredients }) {
            ingredients.forEach(ingredient => {
                //Denna kodrad söker efter redan existerade titel på ingredient

                let existingIngredient = this.shoppingBag.find(item => item.title === ingredient.name);

                if (existingIngredient) {

                    existingIngredient.gram += ingredient.gram;
                } else {

                    let newItem = {
                        title: ingredient.name,
                        gram: ingredient.gram,
                        checked: false,
                    };
                    this.shoppingBag.push(newItem);
                }
            });
        },

        toggleAllergenInfo() {
            this.isAllergenInfoActive = !this.isAllergenInfoActive;
        },

        toggleCheckbox(ingredient) {
            ingredient.checked = !ingredient.checked;
        },

        removeCheckedItems() {

            this.shoppingBag = this.shoppingBag.filter(item => !item.checked);

        },

        checkAll() {
            let allChecked = this.shoppingBag.every(item => item.checked);
            this.shoppingBag.forEach(item => (item.checked = !allChecked));
        },

        copyShoppingList() {

            let shoppingListText = this.shoppingBag
                .map(item => `${item.title}: ${item.gram} g`)
                .join('\n');

            navigator.clipboard.writeText(shoppingListText)
                .then(() => {

                    alert('Your shopping-list has been copied.');
                });
        }

    }
})
    .mount('#app');