// This is where project configuration and plugin options are located. 
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

module.exports = {
  siteName: '도야지 생각지',
  siteDescription: '도야지가 길게 이야기를 쓰고 싶을 때 들리는 곳',
  siteUrl: 'mcodyaji.netlify.app',
  plugins: [
    {
      use: 'gridsome-plugin-tailwindcss',
      options: {
        tailwindConfig: './tailwind.config.js',
        purgeConfig: {
          whitelist: ['svg-inline--fa', 'table', 'table-striped', 'table-bordered', 'table-hover', 'table-sm'],
          whitelistPatterns: [/fa-$/, /blockquote$/, /code$/, /pre$/, /table$/, /table-$/]
        },
        presetEnvConfig: {},
        shouldPurge: false,
        shouldImport: false,
        shouldTimeTravel: true,
        shouldPurgeUnusedKeyframes: true,
      }
    }, 
    {
      use: 'gridsome-source-static-meta',
      options: {
        path: 'content/site/*.json'
      }
    }, 
    {
      use: '@gridsome/source-filesystem',
      options: {
        typeName: 'Author',
        path: './content/author/*.md'
      }
    }, 
    {
      use: '@gridsome/source-filesystem',
      options: {
        typeName: 'Blog',
        path: './content/blog/**/*.md',
        refs: {
          author: 'Author',
          tags: {
            typeName: 'Tag',
            create: true
          },
          category: {
            typeName: 'Category',
            create: true
          }
        }
      }
    }
  ],
  transformers: {
    remark: {
      plugins: [
        '@noxify/gridsome-remark-table-align',
        ['@noxify/gridsome-remark-classes', {
          'table': 'table table-striped',
          'tableCell[align=center]': 'text-center',
          'tableCell[align=right]': 'text-right'
        }]
      ]
    }
  },
  templates: {
    Blog: [{
      path: '/blog/:title_raw'
    }],
    Category: [{
      path: '/category/:title_raw',
      component: '~/templates/Category.vue'
    }],
    Author: [{
      path: '/author/:name_raw',
      component: '~/templates/Author.vue'
    }],
    Tag: [{
      path: '/tags/:title_raw',
      component: '~/templates/Tag.vue'
    }],
  }
}
