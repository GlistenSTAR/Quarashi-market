<script>
    import ContentLoader from 'svelte-content-loader';

    export const width=""
    export const height=""
</script>

<span>
    <ContentLoader>
        <rect x="0" y="0" rx="3" ry="3" width={width} height={height} />
    </ContentLoader>
</span>