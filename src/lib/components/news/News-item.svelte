<script>
    import moment from "moment";

    export let item = {};
    export let key = "";
</script>

<div class="news-item" {key}>
    <h5>
        <a
            href={item.url}
            class="text-decoration-none text-white"
            target="_blank"
            rel="noreferrer">{item.title}</a
        >
    </h5>
    <h6>{moment(item.published_on * 1000).fromNow()}</h6>
</div>

<style>
    h5 {
        color: white;
        font-size: 14px;
    }
    h6 {
        color: rgb(185, 185, 185);
        font-size: 12px;
    }
    a {
        color: white;
    }
    a:hover {
        color: #c921cd;
        text-decoration: none;
    }
    .news-item {
        margin-top: 8px;
        background-color: #0b0b12;
        border-radius: 12px;
        padding: 15px;
        min-height: 110px;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    @media (max-width: 1411px) {
        .news-item {
            padding-left: 10px;
            padding-right: 10px;
        }
    }
</style>
