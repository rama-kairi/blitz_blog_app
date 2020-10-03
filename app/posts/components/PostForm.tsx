import { Form, Field } from "react-final-form"
import { useQuery, useRouter, useSession } from "blitz"
import styles from './PostForm.module.scss'
import createPost from "../mutations/createPost"


const Blogform = () => {
  const router = useRouter()

  const session = useSession();
  const id = session.userId

  const onSubmit = async (formobj) => {
    try {
      await createPost({
        data: {
          title: formobj.title, imageUrl: formobj.imageUrl, description: formobj.description, user: {
            connect: { id: id }
          }
        }
      })
      router.push("/author")
    } catch (error) {
      alert("Error creating article " + JSON.stringify(error, null, 2))
    }

  }


  return (
    <div>
      <Form
        onSubmit={onSubmit}
        initialValues={{}}
      >
        {({ handleSubmit, form, submitting, pristine }) => (
          <form onSubmit={handleSubmit} className="form_control">

            <div>
              <Field
                name="title"
                component="input"
                type="text"
                placeholder="Blog Title"
              />
            </div>

            <div>
              <Field
                name="imageUrl"
                component="input"
                type="text"
                placeholder="Image Url"
              />
            </div>

            <div>
              <Field name="description" component="textarea" placeholder="Blog Description" />
            </div>

            <div className="buttons">
              <button type="submit" disabled={submitting || pristine}>
                Submit
            </button>
            </div>
          </form>
        )}

      </Form>
    </div>
  )
}

export default Blogform
