const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const dir = path.join(__dirname, 'markdown');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.md'));

const recipes = files.map(file => {
  const raw = fs.readFileSync(path.join(dir, file), 'utf8');
  const { data, content } = matter(raw);

  return {
    title: data.title,
    category: data.category || '',
    subcategory: data.subcategory || '',
    intro: content.trim(),
    ingredientGroups: data.ingredientGroups || [],
    steps: data.steps || []
  };
}).filter(recipe => recipe && recipe.title);

fs.writeFileSync('recipes.json', JSON.stringify(recipes, null, 2));
console.log('✅ recipes.json created with', recipes.length, 'recipes.');
