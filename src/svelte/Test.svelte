<script lang="ts">
    import { getLocalized } from "../scripts/helpers";
    
    interface TestSheetProps {
		// only components that have at most the "prop"
		// property required can be passed
        hello: string;
        world: string;
		// DynamicComponent?: Component<{prop: string}>;
    }
    
    let {
        hello,
        world,
		// DynamicComponent
    }: TestSheetProps = $props();
    
</script>
<!-- <DynamicComponent prop="hello" /> -->
<label for="name">Temp</label>
<input type="text" name="name" value="{hello}"/>

<label for="health">orary</label>
<input type="text" id="health" name="data.health.value" value="{world}"/>

<label for="power">{getLocalized("ACTOR.power")}</label>
<input type="text" id="power" name="data.power.value" value="1"/>

<label for="biography">{getLocalized("ACTOR.biography")}</label>
<textarea id="biography" name="data.biography" value="three"></textarea>

<br />

<p class="footer">Visit the <a href="https://svelte.dev/tutorial">Svelte tutorial</a> to learn how to build Svelte apps.</p>

<style>
	:global(.character) {
		background: green
	}

	:global(.character > .window-content) {
		background: #fff
	}

	label {
		color: #ff3e00;
		font-size: 1.2rem;
		text-transform: uppercase;
		font-weight: 100;
	}

	input, textarea {
		background: #ddd;
		margin-bottom: 1rem;
	}

	.footer {
		text-align: center;
	}
</style>