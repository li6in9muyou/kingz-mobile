<!-- Default data -->
<script>
    import {createEventDispatcher} from "svelte";

    const dispatch = createEventDispatcher();

    function handleClick(dir) {
        dispatch("directionChosen", {direction: dir});
    }
</script>

<main>
    <button on:click={() => handleClick("up")}> up</button>

    <div class="row">
        <button on:click={() => handleClick("left")}> left</button>
        <button on:click={() => handleClick("right")}> right</button>
    </div>

    <button on:click={() => handleClick("down")}> down</button>
</main>

<!-- Include styles -->
<style>
    button {
        min-width: fit-content;
        margin: 2rem 2rem;
        padding: 1rem;
        border-radius: 0.5rem;
    }

    main {
        color: lightgray;
        background-color: rgba(90, 0, 0, 0.6);
        height: 100vh;
        width: 100vw;

        flex-direction: column;
        display: flex;
        align-items: center;
        justify-content: center;

        position: absolute;
        top: 0;
        left: 0;
    }
</style>
