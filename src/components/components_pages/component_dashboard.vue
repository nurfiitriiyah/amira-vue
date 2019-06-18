<template>
    <div>
        <componentHeads></componentHeads>

        <div class="row col-lg-12">
            <div class="col-lg-3 col-md-6 col-sm-6">
                <div class="card card-stats">
                    <div class="card-header card-header-warning card-header-icon">
                        <div class="card-icon">
                            <i class="material-icons">content_copy</i>
                        </div>
                        <p class="card-category">Waiting For Payment</p>
                        <h3 class="card-title">{{datas[2]}}
                        </h3>
                    </div>
                    <div class="card-footer">
                        <div class="stats">
                            <i class="material-icons text-danger">warning</i>
                            <a href=""> Click here for detail</a>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-lg-3 col-md-6 col-sm-6">
                <div class="card card-stats">
                    <div class="card-header card-header-success card-header-icon">
                        <div class="card-icon">
                            <i class="material-icons">content_copy</i>
                        </div>
                        <p class="card-category">Reserved</p>
                        <h3 class="card-title">{{datas[0]}}</h3>
                    </div>
                    <div class="card-footer">
                        <div class="stats">
                            <i class="material-icons text-danger">warning</i>
                            <a href=""> Click here for detail</a>

                        </div>
                    </div>
                </div>
            </div>
            <div class="col-lg-3 col-md-6 col-sm-6">
                <div class="card card-stats">
                    <div class="card-header card-header-danger card-header-icon">
                        <div class="card-icon">
                            <i class="material-icons">content_copy</i>
                        </div>
                        <p class="card-category">Cancel</p>
                        <h3 class="card-title">{{datas[1]}}</h3>
                    </div>
                    <div class="card-footer">
                        <div class="stats">
                            <i class="material-icons text-danger">warning</i>
                            <a href=""> Click here for detail</a>

                        </div>
                    </div>
                </div>
            </div>
            <div class="col-lg-3 col-md-6 col-sm-6">
                <div class="card card-stats">
                    <div class="card-header card-header-info card-header-icon">
                        <div class="card-icon">
                            <i class="material-icons">content_copy</i>
                        </div>
                        <p class="card-category">Total all Transaction</p>
                        <h3 class="card-title">{{datas[0] + datas[1] + datas[2] }}</h3>
                    </div>
                    <div class="card-footer">
                        <div class="stats">
                            <i class="material-icons text-danger">warning</i>
                            <a href=""> Click here for detail</a>

                        </div>
                    </div>
                </div>
            </div>

        </div>
        <div class="row col-lg-12">
            <div class="card" style="padding: 20px; margin-left: 20px">


                <h2>Graph</h2>
                <canvas id="graph_line"></canvas>
            </div>
        </div>

    </div>

</template>

<script>
    import componentHeader from '../components_layouts/component_heads'

    const axios = require('axios');
    const API_URL = 'http://localhost:10009/dashboard';
    import {Bar} from 'vue-chartjs'


    export default {
        extends: Bar,
        props: ["data", "options"],
        name: 'dashboard',
        data() {
            return {
                datas: {},
            }
        }, components: {
            "componentHeads": componentHeader
        }, methods: {
            getChartData() {
                axios.get(API_URL)
                    .then(response => {
                        this.datas = response.data.result.GraphCountTotal
                        var labelData = response.data.result.GraphLabel
                        var chartData = response.data.result.DashDetailGraph
                        var ctx = document.getElementById("graph_line").getContext('2d');
                        new Chart(ctx, {
                            type: 'line',
                            data: {
                                labels: labelData,
                                datasets: [
                                    {label: "Approved", data: chartData.Approve, borderColor: this.dynamicColors},
                                    {label: "Rejected", data: chartData.Reject, borderColor: this.dynamicColors},
                                    {label: "Pending", data: chartData.Pending, borderColor: this.dynamicColors},
                                ]
                            }
                        });
                    })

            },
            dynamicColors() {
                var r = Math.floor(Math.random() * 255);
                var g = Math.floor(Math.random() * 255);
                var b = Math.floor(Math.random() * 255);
                return "rgb(" + r + "," + g + "," + b + ")";
            }
        }, created() {
            this.getChartData()
        }
    }
</script>