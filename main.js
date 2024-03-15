Vue.createApp({
    data() {

        return {
            showRecipes: false,
            showShoppingList: false,
            shoppingBag: [],
            recipes: [],
            isAllergenInfoActive: false,
            cartItemCount: 0  
        };
    },

    methods: {
        getImagePath(imageFileName) {

            return `./foodImages/${imageFileName}`;
        },

        async getStarters() {
            await this.fetchRecipes('starter');
            this.$refs.scroll.scrollTop=0;
        },
        async getMainCourses() {
            await this.fetchRecipes('main course');
            this.$refs.scroll.scrollTop=0;
        },
        async getDesserts() {
            await this.fetchRecipes('dessert');
            this.$refs.scroll.scrollTop=0;
        },
        async getVegan() {
            await this.fetchRecipes('vegan');
            this.$refs.scroll.scrollTop=0;
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
            this.cartItemCount = this.shoppingBag.length; 
            
        },
        

        toggleAllergenInfo() {
            this.isAllergenInfoActive = !this.isAllergenInfoActive;
        },


        removeCheckedItems() {

            this.shoppingBag = this.shoppingBag.filter(item => !item.checked);
            this.cartItemCount = this.shoppingBag.length; 
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
               
        },

    }
})
    .mount('#app');