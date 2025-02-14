'use client'
import { useEffect, useState,useContext } from "react"
import { Edit, MoveLeftIcon, Plus, ScanBarcode, Trash2, XIcon,Check, CornerDownRight, CornerDownLeft, Eraser, Loader2, Indent, Bold, Italic, Strikethrough, ListOrdered, List, ListPlus, UnderlineIcon } from "lucide-react"
import {DropdownMenu,DropdownMenuCheckboxItem,DropdownMenuContent,DropdownMenuItem,DropdownMenuLabel,DropdownMenuSeparator,DropdownMenuTrigger} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { useEditor, EditorContent,BubbleMenu } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Blockquote from '@tiptap/extension-blockquote'
import OrderedList from '@tiptap/extension-ordered-list'
import Underline from '@tiptap/extension-underline'


import React from 'react'

const Tiptap = () => {
     const editor = useEditor({
          immediatelyRender:false,
          extensions: [
               StarterKit,
               Underline,
               OrderedList.configure({
                    keepMarks: true,
                  })

          ],
          content: '<p>Hello World! 🌎️</p>',
     })

  return (
     <div>
          <div className="w-full mt-2 shadow bg-white rounded-lg p-3 h-fit">
               <div className="rounded-md border-t border-gray-100 p-1 shadow-md">



                    <div className="inline-flex items-center gap-1">
                         <Button size="xs" variant="ghost" onClick={() => editor.chain().focus().toggleOrderedList().run()} className={editor&&editor.isActive('orderedList') ? 'is-active' : ''}>
                              <ListOrdered />
                         </Button>
                         <Button size="xs" variant="ghost" onClick={() => editor.chain().focus().toggleBulletList().run()} className={editor&&editor.isActive('bulletList') ? 'is-active' : ''}>
                              <List />
                         </Button>
                         <Button size="xs" variant="ghost" onClick={() => editor.chain().focus().sinkListItem('listItem').run()} disabled={editor&&!editor.can().sinkListItem('listItem')}>
                              <ListPlus/>
                         </Button>
                         <Button size="xs" variant="ghost"
                              onClick={() => editor.chain().focus().toggleBlockquote().run()}
                              className={editor&&editor.isActive('blockquote') ? 'is-active' : ''}>
                              <Indent />
                         </Button>
                    </div>




                    <div className="inline-flex items-center gap-1">
                         <Button size="xs" variant="ghost"
                              onClick={() => editor.chain().focus().toggleBold().run()}
                              className={editor&&editor.isActive('bold') ? 'is-active' : ''}
                              >
                              <Bold />
                         </Button>
                         <Button size="xs" variant="ghost"
                         onClick={() => editor.chain().focus().toggleItalic().run()}
                              className={editor&&editor.isActive('italic') ? 'is-active' : ''}
                              >
                              <Italic />
                         </Button>
                         <Button size="xs" variant="ghost"
                         onClick={() => editor.chain().focus().toggleUnderline().run()}
                         className={editor&&editor.isActive('underline') ? 'is-active' : ''}
                         >
                              <UnderlineIcon />
                         </Button>
                         <Button size="xs" variant="ghost"
                         onClick={() => editor.chain().focus().toggleStrike().run()}
                              className={editor&&editor.isActive('strike') ? 'is-active' : ''}
                              >
                              <Strikethrough />
                         </Button>
                    </div>
               </div>
               {editor && <BubbleMenu editor={editor} tippyOptions={{ duration: 100 }}>
               </BubbleMenu>}
               <EditorContent editor={editor} /> 
          </div>
     </div>
  )
}

export default Tiptap
