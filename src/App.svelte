<h1>Hello, Kingz</h1>

{#if shouldShowDirection}
    <Direction on:directionChosen={directionChosen}/>
{/if}

<div id="Grid" style="--GRID_DIM:{GRID_DIM}">
    {#each gameState as data,index}
        <Cell on:cellClicked={(ev)=>cellClicked(index)} {data}/>
    {/each}
</div>

<script>
    import Cell from './Cell.svelte';
    import Direction from './Direction.svelte';
    import fill from 'lodash';

    const GRID_SIZE = 25;
    const GRID_DIM = Math.floor(Math.sqrt(GRID_SIZE));


    let shouldShowDirection = false;
    $: gameState = spawnTroops(GRID_SIZE);

    let direction = '';
    let subjectedCell = -1;

    function cellClicked(i) {
        subjectedCell = i
        shouldShowDirection = true;
    }

    function directionChosen(ev) {
        direction = ev.detail.direction;
        shouldShowDirection = false;
        moveTroop(subjectedCell, {direction: direction});
    }


    function moveTroop(which, how) {
        const {direction} = how;
        const count = gameState[which].troopCount - 1;

        switch (direction) {
            case 'up': {
                const origx = Math.floor(which / GRID_DIM);
                const tgtx = origx - 1;
                const origy = Math.floor(which % GRID_DIM);
                if (tgtx < 0) return;
                const from = gameState[tgtx * GRID_DIM + origy];
                const to = gameState[origx * GRID_DIM + origy];
                if (from.troopOwner === to.troopOwner) {
                    from.troopCount += count;
                    to.troopCount -= count;
                } else {
                    if (count > to.troopCount) {
                        to.troopOwner = from.troopOwner;
                        to.troopCount = count - to.troopCount;
                        from.troopCount -= count
                    } else if (count < to.troopCount) {
                        from.troopCount -= count;
                        to.troopCount -= count;
                    }
                }
                break;
            }
            default: {
                console.log('move troop', which, how);
                break;
            }
        }
        gameState = gameState;
    }

    function spawnTroops(totalCellCnt) {
        const gridDim = Math.sqrt(totalCellCnt);
        const blank = Array(totalCellCnt).fill();

        for (let r = 0; r < gridDim; r += 1) {
            for (let c = 0; c <= r; c += 1) {
                const isMine = Math.random() > 0.5;
                const count = 5 + Math.floor(20 * Math.random());
                const current = r * gridDim + c;
                const currentMirror = (gridDim - 1 - r) * gridDim + gridDim - 1 - c;

                if (current === currentMirror) {
                    blank[current] = {troopCount: 0, troopOwner: 'none'};
                } else {
                    blank[current] = {troopCount: count, troopOwner: isMine ? 'blue' : 'red'};
                    blank[currentMirror] = {troopCount: count, troopOwner: !isMine ? 'blue' : 'red'};
                }
            }
        }
        console.log(blank);
        return blank;
    }
</script>

<!-- Include styles -->
<style>
    #Grid {
        display: grid;
        grid-template-columns: repeat(var(--GRID_DIM), 1fr);
        gap: 8px;
        width: 300px;
    }
</style>
