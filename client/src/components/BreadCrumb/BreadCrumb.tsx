import './style.css';

type Props = {
    title: String
}

const BreadCrumb = ({ title }: Props) => {
  return (
    <div className="breadcrumb_section">
    <div className="container">
        <div className="row align-items-center">
            <div className="col-md-6">
                <div className="page-title">
                    <h1>{title}</h1>
                </div>
            </div>
        </div>
    </div>
</div>
  )
}

export default BreadCrumb;
