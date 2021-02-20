package com.example.foodapp

class Recipe_Info {

    var recipe_id: Int
    var title: String
    var publisher: String
    var image_url: String

    constructor(recipe_id: Int, title: String, publisher: String, image_url: String) {
        this.recipe_id = recipe_id
        this.title = title
        this.publisher = publisher
        this.image_url = image_url
    }
}
