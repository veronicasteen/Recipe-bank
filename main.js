let app = Vue.createApp({
    data() {
        return {
            recipes: [],
            showRecipes: false,
            
        };
    },

    methods: {
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

            const response = await fetch('recipes.json'); // Adjust the path based on your file structure
            const data = await response.json();
            this.recipes = data.recipes.filter(recipe => recipe.mealType === category);
            this.showRecipes = true;
        }
    }
});

app.mount('#app');
