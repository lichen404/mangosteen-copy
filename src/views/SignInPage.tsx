import { defineComponent, reactive, ref } from "vue";
import { MainLayout } from "../layouts/MainLayout";
import { Icon } from "../shared/Icon";
import s from "./SignInPage.module.scss";
import { Form, FormItem } from "../shared/Form";
import { Button } from "../shared/Button";
import { hasError, validate } from "../shared/validate";
import { http } from "../shared/Http";
import { useBool } from "../hooks/useBool";

import { useRoute, useRouter } from "vue-router";
import { BackIcon } from "../shared/BackIcon";
import { useMeStore } from "../stores/useMeStore";
import { Toast } from "vant";

const SignInPage = defineComponent({
  setup(props, context) {
    const meStore = useMeStore();
    const formData = reactive({
      email: "2725546002@qq.com",
      code: "",
    });
    const errors = reactive<{
      email: string[],
      code: string[]
    }>({
      email: [],
      code: [],
    });
    const refValidationCode = ref<any>();
    const router = useRouter();
    const route = useRoute();
    const {
      ref: refDisabled,
      toggle,
      on: disabled,
      off: enable,
    } = useBool(false);
    const onSubmit = async (e: Event) => {
      e.preventDefault();
      Object.assign(errors, {
        email: [],
        code: [],
      });
      Object.assign(
        errors,
        validate(formData, [
          { key: "email", type: "required", message: "必填" },
          {
            key: "email",
            type: "pattern",
            regex: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,
            message: "必须是邮箱地址",
          },
          { key: "code", type: "required", message: "必填" },
          {
            key: "code",
            type: "pattern",
            regex: /^\d{6}$/,
            message: "请输入六位数字",
          },
        ])
      );
      if (!hasError(errors)) {
        const response = await http
          .post<{ jwt: string }>("/session", formData, {
            _autoLoading: true,
            _mock: "session",
          })
          .catch((e) => {
            Toast.fail(e.response.data.error);
          });
        if (response) {
          localStorage.setItem("jwt", response.data.jwt);
          const returnTo = route.query.return_to?.toString();
          meStore.refreshMe();
          router.push(returnTo || "/");
        }
      }
    };

    const onError = (error: any) => {
      if (error.response.status === 422) {
        Object.assign(errors, error.response.data.errors);
      }
      throw error;
    };

    const onClickSendValidationCode = async () => {
      disabled();
      Object.assign(errors, {
        email: [],
        code: [],
      });
      Object.assign(errors, validate(formData, [
        { key: "email", type: "required", message: "必填" },
        {
          key: "email",
          type: "pattern",
          regex: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,
          message: "必须是邮箱地址",
        },
      ]))
      if (errors.email && errors.email.length > 0) {
        enable();
        return;
      }
      const res = await http
        .post(
          "/validation_codes",
          {
            email: formData.email,
          },
          { _autoLoading: true }
        )
        .catch(onError)
        .finally(enable);
      refValidationCode.value.startCount();
    };
    return () => (
      <MainLayout>
        {{
          title: () => "登录",
          icon: () => <BackIcon />,
          default: () => (
            <div class={s.wrapper}>
              <div class={s.logo}>
                <Icon class={s.icon} name="mangosteen" />
                <h1 class={s.appName}>山竹记账</h1>
              </div>
              <Form onSubmit={onSubmit}>
                <FormItem
                  label="邮箱地址"
                  type="text"
                  placeholder="请输入邮箱，然后点击发送验证码"
                  v-model={formData.email}
                  error={errors.email?.[0]}
                />
                <FormItem
                  ref={refValidationCode}
                  label="验证码"
                  type="validationCode"
                  placeholder="请输入六位数字"
                  v-model={formData.code}
                  error={errors.code?.[0]}
                  disabled={refDisabled.value}
                  onClick={onClickSendValidationCode}
                />
                <FormItem style={{ paddingTop: "96px" }}>
                  <Button type="submit">登录</Button>
                </FormItem>
              </Form>
            </div>
          ),
        }}
      </MainLayout>
    );
  },
});

export default SignInPage;
