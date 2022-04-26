<script>
    export let name = "";
    export let icon = "";
    export let content = "";

    import block_coin from "./../../assets/img/coins/block_coin.png";
</script>

<div class="coinbox">
    <div style="display: flex; align-items: center; padding-bottom: 12px">
        <img src={icon === "block_coin" ? block_coin : ""} alt="coin" />
        <h3>{name}</h3>
    </div>
    <div>
        <h5>{content}</h5>
    </div>
</div>

<style>
    .coinbox {
        background-color: #141421;
        padding: 20px;
        height: 120px;
        width: 300px;
        max-width: 300px;
        margin-left: 10px;
        margin-right: 10px;
        border-radius: 12px;
    }

    h3{
        font-size: 18px;
        margin-left: 7px;
        margin-bottom: 0
    }

    h5{
        font-size: 12px;
    }
    
</style>
