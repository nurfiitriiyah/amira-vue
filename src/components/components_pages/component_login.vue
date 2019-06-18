<template>
    <div class="row col-lg-12">
        <div class="col-lg-2"></div>
        <div class="col-lg-8">
            <div class="card">
                <div class="card-header"><h2>Please Login</h2></div>
                <div class="card-body">
                    <form>
                        <div class="form-group">
                            <label for="exampleInputEmail1">Email address</label>
                            <input v-model="login.Username" type="email" class="form-control" id="exampleInputEmail1"
                                   aria-describedby="emailHelp" placeholder="Enter email">
                        </div>
                        <div class="form-group">
                            <label for="exampleInputPassword1">Password</label>
                            <input v-model="login.Password" type="password" class="form-control"
                                   id="exampleInputPassword1" placeholder="Password">
                        </div>

                        <button @click="submitLogin" style="float: right" type="submit" class="btn btn-primary">Submit
                        </button>
                    </form>
                </div>
            </div>
        </div>
        <div class="col-lg-2"></div>
    </div>
</template>

<script>
    const axios = require('axios');
    const API_URL = 'http://localhost:10009/login';
    export default {
        name: 'login',
        data() {
            return {
                showError: false,
                login: {}
            };
        }, methods: {
            submitLogin() {
                axios.post(API_URL, this.login).then((response) => {
                        localStorage.setItem('token', response.data.token)
                        this.$router.push('/dashboard');
                    },
                    (error) => {
                        console.log(error)
                    })
            }
        }
    }
</script>