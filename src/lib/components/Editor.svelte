<script lang="ts">
	import { onMount, onDestroy } from 'svelte'
	import { Editor } from '@tiptap/core'
	import StarterKit from '@tiptap/starter-kit'
	import Link from '@tiptap/extension-link'
	import Image from '@tiptap/extension-image'

	let { value = $bindable(''), placeholder = 'Escreva aqui...' }: {
		value?: string
		placeholder?: string
	} = $props()

	let element: HTMLDivElement
	let editor: Editor

	onMount(() => {
		editor = new Editor({
			element,
			extensions: [
				StarterKit,
				Link.configure({ openOnClick: false }),
				Image
			],
			content: value,
			editorProps: {
				attributes: { class: 'prose editor-content', 'data-placeholder': placeholder }
			},
			onUpdate: ({ editor: e }) => {
				value = e.getHTML()
			}
		})
	})

	onDestroy(() => { if (editor) editor.destroy() })

	function cmd(command: string, attrs?: Record<string, unknown>) {
		const chain = editor.chain().focus()
		if (command === 'toggleBold') chain.toggleBold().run()
		else if (command === 'toggleItalic') chain.toggleItalic().run()
		else if (command === 'toggleStrike') chain.toggleStrike().run()
		else if (command === 'toggleCode') chain.toggleCode().run()
		else if (command === 'toggleBulletList') chain.toggleBulletList().run()
		else if (command === 'toggleOrderedList') chain.toggleOrderedList().run()
		else if (command === 'toggleBlockquote') chain.toggleBlockquote().run()
		else if (command === 'setHorizontalRule') chain.setHorizontalRule().run()
		else if (command === 'h2') chain.toggleHeading({ level: 2 }).run()
		else if (command === 'h3') chain.toggleHeading({ level: 3 }).run()
		else if (command === 'setLink') {
			const url = prompt('URL do link:')
			if (url && /^https?:\/\//i.test(url)) editor.chain().focus().setLink({ href: url }).run()
			else if (url) alert('Apenas URLs começando com http:// ou https:// são permitidas.')
		}
		else if (command === 'addImage') {
			const url = prompt('URL da imagem:')
			if (url && /^https?:\/\//i.test(url)) editor.chain().focus().setImage({ src: url }).run()
			else if (url) alert('Apenas URLs começando com http:// ou https:// são permitidas.')
		}
	}
</script>

<div class="editor-wrap">
	<div class="toolbar" role="toolbar" aria-label="Formatação">
		<button type="button" onclick={() => cmd('h2')} title="Título H2">H2</button>
		<button type="button" onclick={() => cmd('h3')} title="Título H3">H3</button>
		<span class="sep"></span>
		<button type="button" onclick={() => cmd('toggleBold')} title="Negrito"><b>B</b></button>
		<button type="button" onclick={() => cmd('toggleItalic')} title="Itálico"><i>I</i></button>
		<button type="button" onclick={() => cmd('toggleStrike')} title="Tachado"><s>S</s></button>
		<button type="button" onclick={() => cmd('toggleCode')} title="Código">`</button>
		<span class="sep"></span>
		<button type="button" onclick={() => cmd('toggleBulletList')} title="Lista">• Lista</button>
		<button type="button" onclick={() => cmd('toggleOrderedList')} title="Lista numerada">1. Lista</button>
		<button type="button" onclick={() => cmd('toggleBlockquote')} title="Citação">" Citar</button>
		<span class="sep"></span>
		<button type="button" onclick={() => cmd('setLink')} title="Link">Link</button>
		<button type="button" onclick={() => cmd('addImage')} title="Imagem">Imagem</button>
		<button type="button" onclick={() => cmd('setHorizontalRule')} title="Linha">—</button>
	</div>

	<div class="editor-body" bind:this={element}></div>
</div>

<style>
	.editor-wrap {
		border: 2px solid var(--grafite);
		background: white;
	}

	.toolbar {
		display: flex;
		flex-wrap: wrap;
		gap: 2px;
		padding: .5rem;
		border-bottom: 2px solid var(--grafite);
		background: var(--concreto);
	}

	.toolbar button {
		font-family: 'Space Mono', monospace;
		font-size: .72rem;
		padding: .3rem .55rem;
		border: 1.5px solid var(--grafite);
		background: var(--cal);
		color: var(--grafite);
		cursor: pointer;
		transition: background .1s, color .1s;
	}
	.toolbar button:hover {
		background: var(--grafite);
		color: var(--cal);
	}

	.sep {
		width: 1px;
		background: var(--sombra);
		margin: 0 .25rem;
		align-self: stretch;
	}

	.editor-body {
		min-height: 400px;
		padding: 1.5rem;
	}

	:global(.editor-content) {
		outline: none;
		min-height: 380px;
	}

	:global(.editor-content p.is-editor-empty:first-child::before) {
		content: attr(data-placeholder);
		color: #aaa;
		pointer-events: none;
		float: left;
		height: 0;
	}
</style>
