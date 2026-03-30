<script>
  import ArticleHeader from '$lib/components/ArticleHeader.svelte';

  let { data } = $props();
  let selected = $state(null);

  let headline = 'Directory of Toilets in Public Parks';
  let byline = 'NYCity News Service';
  let pubDate = '2026-03-29';
</script>

<svelte:head>
  <title>{headline} | NYCity News Service</title>
</svelte:head>

<div class="container">
  <ArticleHeader
    {headline}
    {byline}
    {pubDate}
  />
</div>

<div class="wide-container">  
  <div class="permits">
    {#each data.toilets as toilet, i (i)}
      <!-- svelte-ignore a11y_click_events_have_key_events a11y_no_static_element_interactions -->
      <div class="card" role="button" tabindex="0" onclick={() => selected = toilet}>
        <h3>{toilet.name}</h3>
        <p>{toilet.borough}</p>
      </div>
    {/each}
  </div>

  {#if selected}
    <!-- svelte-ignore a11y_click_events_have_key_events a11y_no_static_element_interactions -->
    <div class="overlay" role="button" tabindex="0" onclick={() => selected = null}>
      <!-- svelte-ignore a11y_click_events_have_key_events a11y_no_static_element_interactions -->
      <div class="popup" role="dialog" tabindex="0" onclick={(e) => e.stopPropagation()}>
        <button class="close-btn" onclick={() => selected = null}>&times;</button>
        <h2>{selected.name}</h2>
        <p><strong>Location:</strong> {selected.location}</p>
        <p><strong>Borough:</strong> {selected.borough}</p>
        <p><strong>Open Year Round:</strong> {selected.open_year_round ?? 'N/A'}</p>
        <p><strong>Handicap Accessible:</strong> {selected.handicap_accessible ?? 'No'}</p>
      </div>
    </div>
  {/if}
</div>

<style lang="scss">
  @use '$lib/styles' as *;

  .permits {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: var(--spacing-sm);
  }

  .card {
    padding: var(--spacing-sm);
    border: var(--border-width-thin) solid var(--color-border);
    cursor: pointer;

    &:hover {
      background-color: var(--color-papaya-whip);
    }
  }
    .overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .popup {
    position: relative;
    background: white;
    padding: var(--spacing-lg);
    max-width: 500px;
    width: 90%;
  }

  .popup button {
    float: right;
    cursor: pointer;
  }

  .close-btn {
    position: absolute;
    top: var(--spacing-xs);
    right: var(--spacing-xs);
    background: none;
    border: none;
    font-size: var(--font-size-3xl);
    line-height: 1;
    color: var(--color-medium-gray);
    cursor: pointer;

    &:hover {
      color: var(--color-dark);
    }
  }
    .wide-container {
    max-width: 1300px;
    margin: var(--spacing-md) auto;
    padding: 0 var(--spacing-sm);
  }
</style>