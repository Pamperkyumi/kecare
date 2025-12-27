 import { Glob } from "bun"
 import { join } from 'node:path';
 
 
 const menuKey = "api"
 //const menuKey = params.article.menu;
  const glob = new Glob(`${menuKey}.menu.ts`);
  const files = Array.from(glob.scanSync({ cwd: import.meta.dir }));
  let menuData = null;
  if (files.length > 0) {
    const filePath = join(import.meta.dir, files[0]);
    const menuModule = await import(filePath);
    menuData = menuModule
  }
  console.log(menuData);