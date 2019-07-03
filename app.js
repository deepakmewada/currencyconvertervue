new Vue({
    el: '#app',
    data: {
        currencies: {

        },
        amount: 0,
        from:'EUR',
        to:'VEF',
        resultee:null,
        loading: false
    },

    mounted(){
        this.getCurrencies();
    },

    computed:{
        formattedCurrencies(){
            return Object.values(this.currencies);
        },
        calculateResult(){
            return Number(this.resultee * this.amount).toFixed(2);
        },
        disabled(){
            return this.amount === 0 || !this.amount || this.loading;
        }
    },

    methods: {

        getCurrencies(){
            const currencies = localStorage.getItem('currencies')
            if(currencies){
                this.currencies = JSON.parse(currencies);
                return;
            };
            axios.get('https://free.currencyconverterapi.com/api/v6/currencies?apiKey=f1fb8917ad4c05c10c00')
                .then(response => {
                    this.currencies = response.data.results;
                    localStorage.setItem('currencies', JSON.stringify(response.data.results));
        });
        },
        convertCurrency(){
            const getURLz = 'https://free.currencyconverterapi.com/api/v6/convert?q=' + this.from + '_' + this.to+ '&apiKey=ba6dec9bfac9b8f9a9ae'
            const key = this.from + '_' + this.to
            this.loading = true
            axios.get(getURLz)
            .then((response) => {

                    this.loading = false;

                    this.resultee = response.data.results[key].val
            })
        }
    }
})