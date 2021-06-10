const App = {
    data() {
        return {
            notes: [],
            arr: [],
            placeholderText: 'text',
            placeholderName: 'name',
            placeholderPrice: '0',
            placeholderSearch: 'type to search',
            valueName: '',
            valueText: '',
            valuePrice: '',
            valueSearch: '',
            isAddingNewItem: false,
            isSearchItems: true
        }
    },

    mounted() {
        fetch('http://localhost:8000/api/item')
        .then(response => response.json())
        .then(json => {for (const item of json) {
            this.notes.push(item)
        }});
    },

    methods: {
        addNewItem() {
            this.isAddingNewItem = true;
            this.isSearchItems = false;
        },

        inputNameChange(e) {
            this.valueName = e.target.value;
        },

        inputTextChange(e) {
            this.valueText = e.target.value;
        },

        inputPriceChange(e) {
            this.valuePrice = e.target.value;
        },

        inputSearchChange(e) {
            this.valueSearch = e.target.value;
        },

        newInputNameChange(idx, e) {
            this.notes[idx].name = e.target.value;
        },

        newInputTextChange(idx, e) {
            this.notes[idx].description = e.target.value;
        },

        newInputPriceChange(idx, e) {
            this.notes[idx].price = e.target.value;
        },

        addNote() {
            if (!(this.valueName.trim()) || !(this.valueText.trim()) || !(this.valuePrice.trim())) {
                alert("Усі поля мають бути заповненні!!!");
            } else if (isNaN(+this.valuePrice.trim())) {
                alert("Ціна має бути числом");
            } else {
                let item = { name: this.valueName, description: this.valueText, price: this.valuePrice, isActiveInput: false };
                this.notes.push(item);
                this.arr = [...this.notes];
                this.valueName = '';
                this.valueText = '';
                this.valuePrice = '';
                this.isAddingNewItem = false;
                this.isSearchItems = true;
                fetch(`http://localhost:8000/api/item`, {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(item)
                  })
                  .then((response) => response.json())
                  .then(res => console.log(res))

                
            }

        },

        editItem(idx) {
            this.notes[idx].isActiveInput = true;
        },

        enterEdit(idx) {
            if (!(this.notes[idx].name.trim()) || !(this.notes[idx].description.trim()) || !(this.notes[idx].price.trim())) {
                alert("Усі поля мають бути заповненні!!!");
            } else if (isNaN(+this.notes[idx].price.trim())) {
                alert("Ціна має бути числом");
            } else {
                this.notes[idx].isActiveInput = false;
            }
        },

        deleteItem(idx) {

            fetch(`http://localhost:8000/api/item/${this.notes[idx]._id}`, {
                method: 'DELETE'
            }).then(res => res.json()) 
            .then(res => console.log(res))

            this.notes.splice(idx, 1);
        },

        searchItem() {
            let newArr = this.arr.filter((item) => {
                return item.name.indexOf(this.valueSearch) >= 0;
            })

            this.notes = [...newArr];
        }

    }
}

Vue.createApp(App).mount('#app');