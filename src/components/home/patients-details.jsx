import { useFormContext } from 'react-hook-form';
import Tooltip from '@mui/material/Tooltip';
import IMask from '../ui/imask';
import Input from '../ui/input';
import Radios from '../ui/radios';
import Select from '../ui/select';
import { usStates } from '../../lib/definitions';
import LifestyleAndHealth from './lifestyle-and-health';
import AgreementCheckbox from '../ui/agreement-checkbox';

const PatientsDetails = () => {
  const { watch } = useFormContext();
  const isMinorChildAppointment = watch('minor_child_appointment') === 'Yes';
  const healthType = watch('mental_health_type');

  console.log(healthType);
  const needsTherapy = ['Both', 'Therapy'].includes(healthType);

  return (
    <fieldset className='fieldset'>
      <section className='fieldset-section'>
        <div className='!mt-4 grid gap-x-8 gap-y-6 sm:grid-cols-2'>
          <Input label='First Name' name='first_name' />
          <Input label='Last Name' name='last_name' />
        </div>

        <Input
          label='Date of Birth (mm/dd/yr)'
          name='date_of_birth'
          
          required
          type='date'
          sx={{
            bgcolor: '#fff',
          }}
        />

        {/* Minor Child Appointment */}
        <div className='pt-[1em]'>
          <h4 className='label'>
            Is this appointment for a minor child?&nbsp;
            <span className='text-red-500'>*</span>
          </h4>
          <div className='flex items-center ~gap-5/7'>
            <Radios name='minor_child_appointment' options={['Yes', 'No']} />
          </div>

          {/* Conditional Acknowledgment Message & Checkbox */}
          {isMinorChildAppointment && (
            <>
              <div className='hidden-section mt-4'>
                <p className='text-sm text-gray-700'>
                  I understand and give permission for my child to be treated by
                  an Orenda Psychiatry provider. As part of my minor child's
                  treatment, their provider may prescribe medication as needed
                  for their condition. I understand the provider may need to
                  speak with me to discuss medication options and changes on an
                  ongoing basis. I understand that I will be informed
                  immediately about situations that could endanger my child. I
                  know this decision to breach confidentiality in these
                  circumstances is up to the Clinicians professional judgment
                  and is in the best interest of my child. I will refrain from
                  requesting detailed information about individual therapy
                  sessions with my child. I understand that I will be provided
                  with periodic updates about general progress, and/or may be
                  asked to participate in therapy sessions as needed. I
                  understand my provider may require one on one sessions with my
                  child without the parent present and they may request to speak
                  to the parent without the child present. Signing below
                  indicates that you have reviewed the policies described above
                  and understand the limits to confidentiality. If you have any
                  questions as we progress with therapy, you can ask your
                  therapist at any time.
                </p>

                <AgreementCheckbox
                  label='I agree'
                  name='minor_child_agreement'
                  className='mt-2'
                  errorMsg='This field is required'
                />
              </div>

              <div className='mt-4 flex flex-col gap-x-8 gap-y-6 sm:flex-row'>
                <Input label={`Minor's Name`} name='minor_name' />
                <Input
                  label='Relationship to child'
                  name='relationship_to_child'
                />
              </div>
            </>
          )}
        </div>

        {/* Sex Assigned at Birth */}
        <div className='pt-[1em]'>
          <h4 className='label flex items-center'>
            Sex assigned at birth:&nbsp;<span className='text-red-500'>*</span>
            <Tooltip
              title='This information is necessary for medical reasons related to psychiatric medications and treatment planning. This information will remain confidential.'
              placement='top'
            >
              <button
                type='button'
                className='ml-2 size-5 rounded-full bg-gray-400 text-[0.75em] leading-none text-white'
              >
                ?
              </button>
            </Tooltip>
          </h4>
          <div className='flex items-center ~gap-5/7'>
            <Radios name='sex_at_birth' options={['Male', 'Female']} />
          </div>
        </div>

        {/* Gender (Optional) */}
        <Input label='Gender (Optional)' name='city' required={false} />
      </section>

      {/* Address Section, Tel & Email */}
      <section className='fieldset-section'>
        <div className='!mt-2 grid ~gap-2/3'>
          <Input label='Address 1' name='address_1' />
          <Input
            label='Address 2'
            name='address_2'
            placeholder='Apartment, suite, unit, building, floor, etc (optional)'
            required={false}
          />
          <div className='grid gap-y-5 ~gap-x-8/16 sm:grid-cols-3'>
            <Input
              label='City'
              name='city'
              errorMsg='City is required'
              size='small'
            />
            <Select
              label='State'
              name='state'
              options={usStates}
              size='small'
            />
            <Input
              label='Zip Code'
              name='zip_code'
              type='number'
              errorMsg='State is required'
              size='small'
            />
          </div>
        </div>

        <div className='grid gap-x-8 gap-y-6 sm:grid-cols-2'>
          <IMask
            label='Telephone Number'
            name='phone_number'
            mask='(999) 999-9999'
            type='tel'
          />

          <Input label='Email Address' name='email' type='email' />
        </div>
      </section>

      {/* More Information Section */}
      <section className='fieldset-section'>
        <div>
          <div className='~mt-5/7'>
            <h3 className='label'>
              What brings you to Orenda Psychiatry at this time? Is there
              something specific, such as a particular event?&nbsp;
              <span className='text-red-500'>*</span>
            </h3>
            <Input
              hiddenLabel
              name='reason_for_visit'
              multiline
              rows={1.5}
              variant='outlined'
            />
          </div>

          <div className='mb-7 mt-7'>
            <h3 className='label'>
              Tell us more about the type of mental health care that you are
              seeking:&nbsp;<span className='text-red-500'>*</span>
            </h3>
            <div className='grid grid-cols-2 gap-3'>
              <Radios
                name='mental_health_type'
                options={[
                  `Psychiatric Services 
                  (Medication Management)`,
                  'Therapy',
                  'Both',
                  "I'm not sure",
                ]}
              />
            </div>

            {needsTherapy && (
              <>
                <div className='hidden-section mt-4'>
                  <p className='text-sm text-gray-700'>
                    Please note that not all our providers offer therapy
                    services at this time, and the first available therapy
                    appointment might be a few days out.
                  </p>

                  <div className='grid mt-5 grid-cols-2'>
                    <Radios
                      name='unavailable_therapy_agreement'
                      errorMsg='This field is required'
                      options={[
                        'I understand',
                        'I need to see someone immediately',
                      ]}
                    />
                  </div>
                </div>

                <div className='mt-4 flex flex-col gap-x-8 gap-y-6 sm:flex-row'>
                  <Input label={`Minor's Name`} name='minor_name' />
                  <Input
                    label='Relationship to child'
                    name='relationship_to_child'
                  />
                </div>
              </>
            )}
          </div>
        </div>

        <div className='pt-5'>
          <h3 className='label'>
            Do you have current suicidal thoughts? If you have current suicidal
            thoughts, please immediately contact 9 1 1 or go to your nearest
            emergency room; or contact the National Suicide Prevention Hotline
            at: 1-800-273-8255.&nbsp;<span className='text-red-500'>*</span>
          </h3>
          <div className='flex items-center ~gap-5/7'>
            <Radios name='suicidal_thoughts?' options={['Yes', 'No']} />
          </div>
        </div>

        <LifestyleAndHealth />
      </section>
    </fieldset>
  );
};

export default PatientsDetails;
