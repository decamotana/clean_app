import { Button, Col, Form, Modal, Row } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/pro-solid-svg-icons";

import FloatInput from "../../../../../../providers/FloatInput";
import { useEffect } from "react";

export default function ModalForm(props) {
	const { toggleModal, setToggleModal, onFinish, isLoading } = props;
	const [form] = Form.useForm();

	useEffect(() => {
		if (toggleModal.data) {
			form.setFieldsValue({
				...toggleModal.data,
			});
		} else {
			form.setFieldsValue({
				advert_type: "",
			});
		}

		return () => {};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [toggleModal]);

	return (
		<Modal
			closeIcon={<FontAwesomeIcon icon={faTimes} />}
			title="Advertisement Type Form"
			open={toggleModal.show}
			footer={null}
			onCancel={() => setToggleModal({ show: false, data: null })}
			className="modal-primary-default modal-admin-advertisement-type"
			forceRender
		>
			<Form form={form} onFinish={onFinish}>
				<Row gutter={12}>
					<Col xs={24} sm={24} md={24}>
						<Form.Item
							name="advert_type"
							hasFeedback
							rules={[
								{
									required: true,
									message: "This field is required.",
								},
							]}
						>
							<FloatInput
								label="Advertisement Type"
								placeholder="Advertisement Type"
							/>
						</Form.Item>
					</Col>

					<Col xs={24} sm={24} md={24}>
						<Button
							htmlType="submit"
							className="btn-main-invert"
							loading={isLoading}
							size="large"
						>
							SUBMIT
						</Button>
					</Col>
				</Row>
			</Form>
		</Modal>
	);
}
