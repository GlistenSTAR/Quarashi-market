<script>
    export let name = "";
    export let method = "";
    export let icon = "";
</script>

<div class="table-card">
    <div class="card-hearder">
        <div style="display: flex; align-items: center;">
            <i class="{icon} {method}" size="32" />
            <span style="margin-left: 12px;">{name}</span>
        </div>
        <div class="see_all">See All</div>
    </div>
    <table class="table table-hover {method}">
        <tr>
            <th width="10%">#</th>
            <th width="35%">Name</th>
            <th width="35%" class="price">Price</th>
            <th width="20%" class="percent">24Hours</th>
        </tr>
        <tr>
            <td>1</td>
            <td>
                <i class="fa fa-user" />
                XDB
            </td>
            <td class="price">$ 0.356</td>
            <td class="percent">+ 14.33%</td>
        </tr>
        <tr>
            <td>2</td>
            <td>
                <i class="fa fa-user" />
                XDB
            </td>
            <td class="price">$ 0.356</td>
            <td class="percent">+ 14.33%</td>
        </tr>
        <tr>
            <td>3</td>
            <td>
                <i class="fa fa-user" />
                XDB
            </td>
            <td class="price">$ 0.356</td>
            <td class="percent">+ 14.33%</td>
        </tr>
        <tr>
            <td>4</td>
            <td>
                <i class="fa fa-user" />
                XDB
            </td>
            <td class="price">$ 0.356</td>
            <td class="percent">+ 14.33%</td>
        </tr>
        <tr>
            <td>5</td>
            <td>
                <i class="fa fa-user" />
                XDB
            </td>
            <td class="price">$ 0.356</td>
            <td class="percent">+ 14.33%</td>
        </tr>
    </table>
</div>

<style>
    .table-card {
        display: flex;
        width: 520px;
        height: 390px;
        background: #141421;
        margin-left: 9px;
        margin-right: 9px;
        border-radius: 12px;
        padding: 20px;
        padding-bottom: 5px;
        flex-direction: column;
    }

    .table-card .card-hearder {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    i {
        font-size: 16px;
    }

    i.up {
        color: #00a478;
        padding: 9px;
        border-radius: 12px;
        background-color: #112a2e;
    }

    i.down {
        color: #d50012;
        padding: 9px;
        border-radius: 12px;
        background-color: #31111f;
    }

    i.lock {
        color: #0b0b12;
        padding: 9px;
        border-radius: 12px;
        background-color: #33333e;
    }

    .see_all {
        color: #c921cd;
    }

    table {
        width: 100%;
        text-align: left;
        height: 100%;
        color: white;
        margin-top: 20px;
        margin-bottom: 0px;
    }

    table .price {
        text-align: center;
    }
    table .percent {
        text-align: right;
    }
    table.up td.percent {
        color: #00a478;
    }
    table.down td.percent {
        color: #d50012;
    }
    table.lock td.percent {
        color: #00a478;
    }

    table tr {
        padding: 16px !important;
        max-height: 57px;
    }
    table th {
        color: rgb(185, 185, 185);
    }

    @media (max-width: 1024px) {
        .table-card{
            width: 100%;
            margin-top: 20px;
            margin-left: 0px;
            margin-right: 0px;
            min-width: 410px;

        }
    }
</style>
