import { registerBlockType } from '@wordpress/blocks';
// import { useBlockProps } from '@wordpress/block-editor';

import json from '../block.json';

const { name, settings } = json

registerBlockType(name, {
  edit:(props)=>{
    // const blockProps =useBlockProps();

    // return <div{...blockProps}>Hello World</div>
    return <div>Hello World</div>
  },
  save:()=>{
    return <div>Hello World</div>
  },
  ...settings
});