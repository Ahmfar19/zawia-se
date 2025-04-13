import { createSignal } from 'solid-js';
import ComponentCard from '../../common/ComponentCard';
import Input from '../input/InputField';
import Label from '../Label';
import Select from '../Select';
import Form from '../Form';
import { t } from '../../../localization';
import Button from '../../ui/button/Button';
import { Member } from '../../../types';

export default function DefaultInputs() {
    const [formValues, setFormValues] = createSignal<Member>({} as Member);

    const onChange = (e: Event) => {
        const target = e.target as HTMLInputElement;
        setFormValues((prev) => ({
            ...prev,
            [target.name]: target.value
        }))
    }

    const handleSubmit = (e: Event) => {
        console.log("Form submitted:", e);
        console.error('formValues', formValues());
    };

    const optionsGender = [
        { label: t('zw_form_gender_male'), value: 1 },
        { label: t('zw_form_gender_femele'), value: 2 },
    ];

    const country = [
        { value: "bd", label: "Bangladesh" },
        { value: "usa", label: "United States" },
        { value: "canada", label: "Canada" },
    ];

    return (
        <ComponentCard title='Default Inputs'>
            <Form onSubmit={handleSubmit}>
                <div class="grid gap-6 sm:grid-cols-2">
                    <div class="col-span-2">
                        <h4 class="pb-4 text-base font-medium text-gray-800 border-b border-gray-200 dark:border-gray-800 dark:text-white/90">
                            {t('zw_form_personalInfor')}
                        </h4>
                    </div>
                    <div class="">
                        <Label for="fname">{t('zw_form_fname')}</Label>
                        <Input
                            type="text"
                            placeholder={t('zw_form_fname')}
                            id="fname"
                            name="fname"
                            onChange={onChange}
                        />
                    </div>
                    <div class="">
                        <Label for="lname">{t('zw_form_lname')}</Label>
                        <Input
                            type="text"
                            placeholder={t('zw_form_lname')}
                            id="lname"
                            name="lname"
                            onChange={onChange}
                        />
                    </div>
                    <div class="">
                        <Label for="phone">{t('zw_form_phoneNumber')}</Label>
                        <Input
                            type="text"
                            placeholder={t('zw_form_phoneNumber')}
                            id="phone"
                            name="phone"
                            onChange={onChange}
                        />
                    </div>
                    <div class="">
                        <Label for="pid">{t('zw_form_personalNumber')}</Label>
                        <Input
                            type="text"
                            placeholder={t('zw_form_personalNumber')}
                            id="pid"
                            name="pid"
                            onChange={onChange}
                        />
                    </div>
                    <div class="">
                        <Label for="email">{t('zw_form_email')}</Label>
                        <Input
                            type="text"
                            placeholder={t('zw_form_email')}
                            id="email"
                            name="email"
                            onChange={onChange}
                        />
                    </div>
                    <div class="">
                        <Label for="gender">{t('zw_form_gender')}</Label>
                        <Select
                            options={optionsGender}
                            placeholder="Select an option"
                            onChange={onChange}
                            defaultValue=""
                            class="bg-gray-50 dark:bg-gray-800"
                            name="gender"
                            value={formValues().gender}
                        />
                    </div>

                    <div class="col-span-2">
                        <h4 class="pb-4 text-base font-medium text-gray-800 border-b border-gray-200 dark:border-gray-800 dark:text-white/90">
                            {t('zw_form_adress')}
                        </h4>
                    </div>
                    <div>
                        <Label for="street">{t('zw_form_adress_street')}</Label>
                        <Input
                            type="text"
                            placeholder={t('zw_form_adress_street')}
                            id="street"
                            name="street"
                            onChange={onChange}
                        />
                    </div>
                    <div>
                        <Label for="city">{t('zw_form_adress_City')}</Label>
                        <Input
                            type="text"
                            placeholder={t('zw_form_adress_City')}
                            id="city"
                            name="city"
                            onChange={onChange}
                        />
                    </div>
                    <div>
                        <Label for="zip">{t('zw_form_adress_zip')}</Label>
                        <Input
                            type="text"
                            placeholder={t('zw_form_adress_zip')}
                            id="zip"
                            name="zip"
                            onChange={onChange}
                        />
                    </div>
                    <div>
                        <Label for="email">{t('zw_form_adress_country')}</Label>
                        <Select
                            options={country}
                            placeholder={t('zw_form_select_country')}
                            onChange={onChange}
                            defaultValue=""
                            class="bg-gray-50 dark:bg-gray-800"
                            name="country"
                            value={formValues().country}
                        />
                    </div>
                    <div class="col-span-full">
                        <div class="flex gap-3">
                            <Button size="sm" variant="primary">
                                {t('zw_button_save_changes')}
                            </Button>
                            <Button size="sm" variant="outline">
                                {t('zw_button_cancel')}
                            </Button>
                        </div>
                    </div>
                </div>
            </Form>
        </ComponentCard>
    );
}
