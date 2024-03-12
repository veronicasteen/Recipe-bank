Vue.createApp({
    data() {
        return {
            showRecipes: false,
            showShoppingList: false,
            shoppingBag: [],
            recipes: [],
            isAllergenInfoActive: false,
            // showPrepreparationTime: false,
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
                // Visa bara shoppingbagen om det finns något i den
                this.showShoppingList = true;
                this.showRecipes = false;
        },

        //metod för att lägga till titel osv i shoppinglistan
        addToShoppingBag({ title, ingredients }) {

            let newItem = {
                title: title,
                ingredients: ingredients,
                checked: false,
            };
            this.shoppingBag.push(newItem);

        },

        toggleAllergenInfo() {
            this.isAllergenInfoActive = !this.isAllergenInfoActive;
        },

        //metod för att kolla om receptet redan finns i shoppingbagen
        //för att inaktivera "add" knappen v

        isRecipeInShoppingBag(recipe) {
            return this.shoppingBag.some(item => item.title === recipe.title);
        },

        //metod för att checka i eller ur checkboxen i shoppinglistan
        toggleCheckbox(item) {

            item.checked = !item.checked;
        },

        //metod för att ta bort icheckade items
        removeCheckedItems() {
            this.shoppingBag = this.shoppingBag.filter(item => !item.checked);
        },

        //metod för att checka i alla items i shoppinglistan
        checkAll() {
            let allChecked = this.shoppingBag.every(item => item.checked);
            this.shoppingBag.forEach(item => (item.checked = !allChecked));
        },

        copyShoppingList() {
            // Hämtar texten från inköpslistan
            let shoppingListText = this.shoppingBag
                .map(item => `${item.title}: ${item.ingredients.join(', ')}`)
                .join('\n');

            // Kopierar texten 
            navigator.clipboard.writeText(shoppingListText)
                .then(() => {
                    // Meddela användaren att kopieringen är klar
                    alert('Your shopping-list has been copied.');
                })

        },
    }
})
.mount('#app');