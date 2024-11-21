import {
  getSignInUrl,
  getSignUpUrl,
  getUser,
  signOut,
} from '@workos-inc/authkit-nextjs'
import Link from 'next/link'

export default async function Header() {
  const { user } = await getUser()
  const signInUrl = await getSignInUrl()
  // const signUpUrl = await getSignUpUrl()
  return (
    <header className="">
      {/* {JSON.stringify(user)} */}
      <div className="flex items-center justify-between  mx-auto my-4">
        <Link href={'/'} className="font-bold text-xl">
          Gigit
        </Link>
        <nav className="flex gap-4   ">
          {!user && (
            <Link className="rounded-md bg-gray-200 py-1 px-2 sm:py-2 sm:px-4" href={signInUrl}>
              Login
            </Link>
          )}

          {user && (
            <form
              action={async () => {
                'use server'
                await signOut()
              }}
            >
              <button
                type="submit"
                className="rounded-md bg-gray-200 py-1 px-2 sm:py-2 sm:px-4"
              >
                Logout
              </button>
            </form>
          )}

          <Link
            className="bg-blue-600  rounded-md text-white py-1 px-2 sm:py-2 sm:px-4"
            href={'/new-listing'}
          >
            Post a Gig
          </Link>
        </nav>
      </div>
    </header>
  )
}
