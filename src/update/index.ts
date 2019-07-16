import firestore from '../adaptor'
import { Collection } from '../collection'
import { Value } from '../value'
import { Field } from '../field'

export type ModelUpdate<Model> = {
  [Key in keyof Model]?: Model[Key] | Value<Model[Key]>
}

async function update<Model>(
  collection: Collection<Model>,
  id: string,
  data: Field<Model>[]
): Promise<void>

async function update<Model>(
  collection: Collection<Model>,
  id: string,
  data: ModelUpdate<Model>
): Promise<void>

async function update<Model>(
  collection: Collection<Model>,
  id: string,
  data: Field<Model>[] | ModelUpdate<Model>
): Promise<void> {
  const firebaseDoc = firestore.collection(collection.path).doc(id)
  const updateData = Array.isArray(data)
    ? data.reduce(
        (acc, { key, value }) => {
          acc[Array.isArray(key) ? key.join('.') : key] = value
          return acc
        },
        {} as { [key: string]: any }
      )
    : data
  await firebaseDoc.update(updateData)
}

export default update
