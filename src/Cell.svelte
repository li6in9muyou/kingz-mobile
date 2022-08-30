<button class:my-troop={data.troopOwner==='blue'}
        class:opposing-troop={data.troopOwner==='red'}
        on:click={handleClick}
>{ data.troopCount }</button>

<script>
    export let data;
    import {createEventDispatcher} from 'svelte';

    const dispatch = createEventDispatcher();

    function handleClick() {
        dispatch('cellClicked');
    }
</script>

<!-- Include styles -->
<style>
    button {
        background-color: lightgray;
        color: black;
        font-size: 1rem;
        height: 100%;
        width: 100%;
        aspect-ratio: 1;
    }

    .my-troop {
        background-color: lightblue;
    }

    .opposing-troop {
        background-color: lightpink;
    }
</style>
