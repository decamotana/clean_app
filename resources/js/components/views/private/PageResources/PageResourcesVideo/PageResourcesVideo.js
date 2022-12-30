import { useEffect, useState } from "react";
import { Card, Col, List, Row, Typography, Button } from "antd";
import moment from "moment";
import ReactPlayer from "react-player";
import {
	TableGlobalAlphaSearch,
	TableGlobalInputSearch,
} from "../../Components/ComponentTableFilter";
import { GET } from "../../../../providers/useAxiosQuery";
import ModalResourcesVideo from "./ModalResourcesVideo";
import $ from "jquery";
import { apiUrl } from "../../../../providers/companyInfo";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRefresh } from "@fortawesome/pro-regular-svg-icons";

export default function PageResourcesVideo() {
	const [tableFilter, setTableFilter] = useState({
		// page: 1,
		// page_size: 50,
		search: "",
		letter: "",
		sort_field: "title",
		sort_order: "asc",
		resource_type: "Video Resource",
	});

	const [dataSource, setDataSource] = useState([]);
	const [dataSourceHigh, setDataSourceHigh] = useState([]);

	const [toggleModalVideo, setToggleModalVideo] = useState({
		show: false,
		data: null,
	});

	const [loadingRefresh, setLoadingRefresh] = useState(false);

	const { refetch: refetchSource } = GET(
		`api/v1/resource?${new URLSearchParams(tableFilter)}`,
		"cc_video_resource_data_list",
		(res) => {
			if (res.data) {
				setLoadingRefresh(false);
				/** tbl alpha filter */
				let tempDataTblFilterGroup = res.dataTblFilter.reduce((r, e) => {
					// get first letter of name of current element
					let group = e.title[0];
					// if there is no property in accumulator with this letter create it
					if (!r[group]) r[group] = { group, children: [e] };
					// if there is push current element to children array for that letter
					else r[group].children.push(e);
					// return accumulator
					return r;
				}, {});
				// since data at this point is an object, to get array of values
				// we use Object.values method
				let resultDataTblFilter = Object.values(tempDataTblFilterGroup);

				resultDataTblFilter.map((item) => {
					// console.log("resultDataTblFilter", item);
					$(".btn-" + item.group.toLowerCase()).addClass("btn-red");
					return "";
				});
				/** end tbl alpha filter */

				/** tbl data */
				// console.log("cc_video_resource_data_list", res);
				let tempDataGroup = res.data.reduce((r, e) => {
					// get first letter of name of current element
					let group = e.title[0];
					// if there is no property in accumulator with this letter create it
					if (!r[group]) r[group] = { group, children: [e] };
					// if there is push current element to children array for that letter
					else r[group].children.push(e);
					// return accumulator
					return r;
				}, {});
				// since data at this point is an object, to get array of values
				// we use Object.values method
				let result = Object.values(tempDataGroup);

				setDataSource(result);

				// result.map((item) => {
				// 	$(".btn-" + item.group.toLowerCase()).addClass("btn-red");
				// 	return "";
				// });
				/** end tbl data */

				/** tbl prio */
				if (res.dataStickeyHigh) {
					let tempDataGroupHigh = res.dataStickeyHigh.reduce((r, e) => {
						// get first letter of name of current element
						let group = e.title[0];
						// if there is no property in accumulator with this letter create it
						if (!r[group]) r[group] = { group, children: [e] };
						// if there is push current element to children array for that letter
						else r[group].children.push(e);
						// return accumulator
						return r;
					}, {});
					// since data at this point is an object, to get array of values
					// we use Object.values method
					let resultHigh = Object.values(tempDataGroupHigh);
					setDataSourceHigh(resultHigh);
					/** end tbl data */
				}
			}
		}
	);

	useEffect(() => {
		refetchSource();

		return () => {};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [tableFilter]);

	return (
		<Card className="page-caregiver-resource-video" id="PageResourcesVideo">
			<Row gutter={[12, 12]}>
				<Col
					xs={{
						order: 1,
						span: 24,
					}}
					sm={{
						order: 1,
						span: 24,
					}}
					md={{
						order: 1,
						span: 24,
					}}
					lg={{
						order: 1,
						span: 24,
					}}
					xl={{
						order: 1,
						span: 24,
					}}
					xxl={{
						order: 0,
						span: 16,
					}}
				>
					<div className="table-filter-alphabet-wrapper">
						<Button
							type="link"
							icon={<FontAwesomeIcon icon={faRefresh} />}
							className="color-1"
							onClick={() => {
								setLoadingRefresh(true);
								$(".table-filter-alphabet .ant-btn").removeClass(
									"btn-main-2-active white"
								);
								setTableFilter({
									...tableFilter,
									search: "",
									letter: "",
								});
							}}
							loading={loadingRefresh}
						/>
						<TableGlobalAlphaSearch
							tableFilter={tableFilter}
							setTableFilter={setTableFilter}
						/>
					</div>
				</Col>
				<Col
					xs={{
						order: 0,
						span: 24,
					}}
					sm={{
						order: 0,
						span: 24,
					}}
					md={{
						order: 0,
						span: 24,
					}}
					lg={{
						order: 0,
						span: 24,
					}}
					xl={{
						order: 0,
						span: 24,
					}}
					xxl={{
						order: 1,
						span: 8,
					}}
				>
					<Row>
						<Col xs={24} sm={24} md={24} lg={14} xl={8} xxl={24}>
							<TableGlobalInputSearch
								tableFilter={tableFilter}
								setTableFilter={setTableFilter}
							/>
						</Col>
					</Row>
				</Col>

				{dataSourceHigh.length > 0 ? (
					<Col
						xs={{
							order: 2,
							span: 24,
						}}
						sm={{
							order: 2,
							span: 24,
						}}
						md={{
							order: 2,
							span: 24,
						}}
						lg={{
							order: 2,
							span: 24,
						}}
						xl={{
							order: 2,
							span: 24,
						}}
						xxl={{
							order: 2,
							span: 24,
						}}
					>
						{dataSourceHigh &&
							dataSourceHigh.map((item, index) => {
								return (
									<List
										key={index}
										className="resource-video-list m-t-lg"
										dataSource={item.children}
										renderItem={(item2) => {
											let embed_code = item2.embed_code.split("/");
											let embed_code_render = "";

											if (embed_code[0] === "https:") {
												embed_code_render = (
													<ReactPlayer
														className="react-player-video"
														url={item2.embed_code}
														controls
													/>
												);
											} else {
												embed_code_render = (
													<div
														className="embed-video-iframe"
														dangerouslySetInnerHTML={{
															__html: item2.embed_code,
														}}
													/>
												);
											}

											return (
												<List.Item
													style={{
														background: "#F1F3F2",
													}}
													className="p-l-sm p-r-sm w-100"
												>
													<div className="flex gap20 w-100">
														<div className="video">{embed_code_render}</div>
														<div className="resource-video-container w-100">
															<div className="container-wrapper w-100">
																<div className="title-container">
																	<div className="flex flex-direction-column">
																		<Typography.Title
																			level={4}
																			className="title"
																		>
																			{item2.title}
																		</Typography.Title>
																		<Typography.Text className="date">
																			{moment(item2.created_at).format(
																				"MMMM DD, YYYY"
																			)}
																		</Typography.Text>
																	</div>

																	<Typography.Text className="description">
																		<span
																			className="embed-video-iframe"
																			dangerouslySetInnerHTML={{
																				__html: item2.description,
																			}}
																		/>
																	</Typography.Text>
																</div>

																<div className="flex flex-direction-column">
																	<Typography.Text className="color-8">
																		SPONSOR <br />
																		{item2.sponsor_name}
																	</Typography.Text>
																	{item2.sponsor_file_path && (
																		<a
																			href={item2.sponsor_url ?? "#"}
																			target="blank"
																		>
																			<img
																				alt={
																					item2.sponsor_file_name
																						? item2.sponsor_file_name
																						: "image preview"
																				}
																				src={
																					apiUrl +
																					"storage/" +
																					item2.sponsor_file_path
																				}
																				style={{
																					width: "80px",
																				}}
																			/>
																		</a>
																	)}
																</div>
															</div>

															<Typography.Link
																className="btn-resource-view"
																onClick={() =>
																	setToggleModalVideo({
																		show: true,
																		data: embed_code_render,
																	})
																}
															>
																WATCH
															</Typography.Link>
														</div>
													</div>
												</List.Item>
											);
										}}
									/>
								);
							})}
					</Col>
				) : null}

				<Col
					xs={{
						order: 3,
						span: 24,
					}}
					sm={{
						order: 3,
						span: 24,
					}}
					md={{
						order: 3,
						span: 24,
					}}
					lg={{
						order: 3,
						span: 24,
					}}
					xl={{
						order: 3,
						span: 24,
					}}
					xxl={{
						order: 3,
						span: 24,
					}}
				>
					{dataSource &&
						dataSource.map((item, index) => {
							return (
								<List
									key={index}
									className="resource-video-list m-t-lg"
									header={
										<Typography.Title level={2} className="color-6">
											{item.group.toUpperCase()}
										</Typography.Title>
									}
									dataSource={item.children}
									renderItem={(item2) => {
										let embed_code = item2.embed_code?.split("/");
										let embed_code_render = "";

										if (embed_code[0] === "https:") {
											embed_code_render = (
												<ReactPlayer
													className="react-player-video"
													url={item2.embed_code}
													controls
												/>
											);
										} else {
											embed_code_render = (
												<div
													className="embed-video-iframe"
													dangerouslySetInnerHTML={{
														__html: item2.embed_code,
													}}
												/>
											);
										}

										return (
											<List.Item>
												<div className="flex gap20">
													<div className="video">{embed_code_render}</div>
													<div className="resource-video-container">
														<div className="flex flex-direction-column">
															<Typography.Title level={4} className="title">
																{item2.title}
															</Typography.Title>
															<Typography.Text className="date">
																{moment(item2.created_at).format(
																	"MMMM DD, YYYY"
																)}
															</Typography.Text>
															<Typography.Text className="description">
																<span
																	className="embed-video-iframe"
																	dangerouslySetInnerHTML={{
																		__html: item2.description,
																	}}
																/>
															</Typography.Text>
														</div>
														<Typography.Link
															className="btn-resource-view"
															onClick={() =>
																setToggleModalVideo({
																	show: true,
																	data: embed_code_render,
																})
															}
														>
															WATCH
														</Typography.Link>
													</div>
												</div>
											</List.Item>
										);
									}}
								/>
							);
						})}
				</Col>
			</Row>

			<ModalResourcesVideo
				toggleModalVideo={toggleModalVideo}
				setToggleModalVideo={setToggleModalVideo}
			/>
		</Card>
	);
}
