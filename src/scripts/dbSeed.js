import dotenv from 'dotenv'
import { createClient } from '@supabase/supabase-js'
import { faker } from '@faker-js/faker/locale/fr'

dotenv.config()

const supabaseUrl = process.env.VITE_SUPABASE_URL
const supabaseServiceKey = process.env.VITE_SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  console.error("❌ Variables d'environnement manquantes")
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey)

const AUTHOR_COUNT = 4
const POSTS_PER_AUTHOR = 5

async function cleanTables() {
  try {
    console.log('Nettoyage des tables...')
    const { error: postsDeleteError } = await supabase
      .from('posts')
      .delete()
      .not('id', 'is', null)

    if (postsDeleteError)
      throw new Error(`Erreur suppression posts: ${postsDeleteError.message}`)

    const { error: authorsDeleteError } = await supabase
      .from('authors')
      .delete()
      .not('id', 'is', null)

    if (authorsDeleteError)
      throw new Error(
        `Erreur suppression authors: ${authorsDeleteError.message}`,
      )

    console.log('✓ Tables nettoyées')
  } catch (error) {
    console.error('Erreur pendant le nettoyage:', error)
    throw error
  }
}

async function seed() {
  try {
    console.log('Début de la génération...')

    await cleanTables()

    // Generate authors
    const authors = Array.from({ length: AUTHOR_COUNT }, () => ({
      name: faker.person.fullName(),
      email: faker.internet.email(),
    }))

    const { data: createdAuthors, error: authorsError } = await supabase
      .from('authors')
      .insert(authors)
      .select()

    console.log('🚀:', createdAuthors)

    if (authorsError) throw new Error(authorsError.message)
    console.log(`✓ ${authors.length} auteurs créés`)

    // Generate posts

    // console.log('🚀:', createdAuthors)
    // console.log(
    //   createdAuthors.map(author =>
    //     Array.from({ length: POSTS_PER_AUTHOR }, () => ({
    //       title: faker.lorem.sentence({ min: 4, max: 8 }),
    //       content: faker.lorem.paragraphs(3),
    //       author_id: author.id,
    //       created_at: faker.date
    //         .between({
    //           from: '2023-01-01T00:00:00.000Z',
    //           to: new Date(),
    //         })
    //         .toISOString(),
    //     })),
    //   ),
    // )
    const posts = createdAuthors.flatMap(author =>
      Array.from({ length: POSTS_PER_AUTHOR }, () => ({
        title: faker.lorem.sentence({ min: 4, max: 8 }),
        content: faker.lorem.paragraphs(8),
        author_id: author.id,
        created_at: faker.date
          .between({
            from: '2023-01-01T00:00:00.000Z',
            to: new Date(),
          })
          .toISOString(),
      })),
    )

    const { error: postsError } = await supabase.from('posts').insert(posts)

    if (postsError) throw new Error(postsError.message)

    console.log(`✓ ${posts.length} posts créés`)

    console.log('✨ Seeding terminé avec succès')
  } catch (error) {
    console.error('❌ Erreur:', error)
    process.exit(1)
  }
}

seed()
