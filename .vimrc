set path=$PWD/web/**,$PWD/lib/**,$PWD/priv/**,$PWD/test/**
set wildignore+=*.so,*.swp,*.beam,node_modules
let g:ctrlp_map = '<C-p>'
let g:ctrlp_custom_ignore = {
      \ 'dir': '(\.git|node_modules)',
      \}
