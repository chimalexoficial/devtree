import { useForm } from 'react-hook-form'
import ErrorMessage from '../components/ErrorMessage';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { User } from '../types';
import { ProfileForm } from '../types';
import { updateProfile } from '../api/DevTreeAPI';
import { toast } from 'sonner'

export default function ProfileView() {


    const queryClient = useQueryClient()
    const data: User = queryClient.getQueryData(['user'])!;
    console.log(data);

    const { register, handleSubmit, reset, formState: { errors } } = useForm<ProfileForm>({
        defaultValues: {
            handle: data.handle,
            description: data.description,
        }
    });

    const updateProfileMutation = useMutation({
        mutationFn: updateProfile,
        onError: (error) => {
            toast.error(error.message);
        },
        onSuccess: (data) => {
            toast.success(data);
            queryClient.invalidateQueries({
                queryKey: ['user']
            })
        }
    });

    const handleUserProfileForm = (formData: ProfileForm) => {
        console.log(formData);

        updateProfileMutation.mutate(formData);
    }

    return (
        <form
            className="bg-white p-10 rounded-lg space-y-5"
            onSubmit={handleSubmit(handleUserProfileForm)}
        >
            <legend className="text-2xl text-slate-800 text-center">Edit</legend>
            <div className="grid grid-cols-1 gap-2">
                <label
                    htmlFor="handle"
                >Username:</label>
                <input
                    type="text"
                    className="border-none bg-slate-100 rounded-lg p-2"
                    placeholder="handle/username"
                    {...register('handle', {
                        required: 'handle is required'
                    })}
                />

                {errors.handle && <ErrorMessage>{errors.handle.message}</ErrorMessage>}
            </div>

            <div className="grid grid-cols-1 gap-2">
                <label
                    htmlFor="description"
                >Description:</label>
                <textarea
                    className="border-none bg-slate-100 rounded-lg p-2"
                    placeholder="Your Description"
                    {...register('description', {
                        required: 'description is required'
                    })}
                />

                {errors.description && <ErrorMessage>{errors.description.message}</ErrorMessage>}

            </div>

            <div className="grid grid-cols-1 gap-2">
                <label
                    htmlFor="handle"
                >Image:</label>
                <input
                    id="image"
                    type="file"
                    name="handle"
                    className="border-none bg-slate-100 rounded-lg p-2"
                    accept="image/*"
                    onChange={() => { }}
                />
            </div>

            <input
                type="submit"
                className="bg-cyan-400 p-2 text-lg w-full uppercase text-slate-600 rounded-lg font-bold cursor-pointer"
                value='Save Changes'
            />
        </form>
    )
}